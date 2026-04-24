const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const profiles = require('./profilesStore');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3001;

const players = {};



// World bounds, tile grid and simple obstacle map for server-side collision validation
const WORLD_WIDTH = 1000
const WORLD_HEIGHT = 800
const TILE_SIZE = 32
const GRID_W = Math.floor(WORLD_WIDTH / TILE_SIZE)
const GRID_H = Math.floor(WORLD_HEIGHT / TILE_SIZE)

// obstacles expressed as rectangles (pixel coords)
const obstacles = [
  { x: 200, y: 150, w: 160, h: 100 },
  { x: 520, y: 320, w: 220, h: 140 },
  { x: 120, y: 420, w: 100, h: 180 }
]

// Build a blocked tile set from obstacles
const blocked = new Set()
for (const ob of obstacles) {
  const sx = Math.floor(ob.x / TILE_SIZE)
  const sy = Math.floor(ob.y / TILE_SIZE)
  const ex = Math.floor((ob.x + ob.w) / TILE_SIZE)
  const ey = Math.floor((ob.y + ob.h) / TILE_SIZE)
  for (let tx = sx; tx <= ex; tx++) {
    for (let ty = sy; ty <= ey; ty++) {
      if (tx >= 0 && tx < GRID_W && ty >= 0 && ty < GRID_H) blocked.add(`${tx},${ty}`)
    }
  }
}

function tileToWorld(tx, ty) {
  return { x: tx * TILE_SIZE + TILE_SIZE / 2, y: ty * TILE_SIZE + TILE_SIZE / 2 }
}

function isTileBlocked(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= GRID_W || ty >= GRID_H) return true
  return blocked.has(`${tx},${ty}`)
}

// Simple NPCs stored alongside players (id starts with 'npc-')
function spawnNPC(id) {
  // find a free tile
  for (let i = 0; i < 2000; i++) {
    const tx = Math.floor(Math.random() * GRID_W)
    const ty = Math.floor(Math.random() * GRID_H)
    if (!isTileBlocked(tx, ty)) {
      const c = tileToWorld(tx, ty)
      players[id] = { id, tileX: tx, tileY: ty, x: c.x, y: c.y, color: '#cc5533', name: `NPC_${id}`, isNPC: true }
      return
    }
  }
}

// spawn a few NPCs
spawnNPC('npc-1')
spawnNPC('npc-2')
spawnNPC('npc-3')

// NPC movement loop: attempt random adjacent moves every second
setInterval(() => {
  const dirs = ['left', 'right', 'up', 'down']
  Object.values(players).forEach((p) => {
    if (!p.isNPC) return
    const dir = dirs[Math.floor(Math.random() * dirs.length)]
    let ntx = p.tileX
    let nty = p.tileY
    if (dir === 'left') ntx = p.tileX - 1
    if (dir === 'right') ntx = p.tileX + 1
    if (dir === 'up') nty = p.tileY - 1
    if (dir === 'down') nty = p.tileY + 1
    if (!isTileBlocked(ntx, nty)) {
      const c = tileToWorld(ntx, nty)
      p.tileX = ntx; p.tileY = nty; p.x = c.x; p.y = c.y
    }
  })
}, 1000)

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/players', (req, res) => res.json(players));

// Simple file-based profiles API
app.get('/profiles/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const profile = await profiles.getProfile(name);
    if (!profile) return res.status(404).json({});
    return res.json(profile);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post('/profiles/:name', async (req, res) => {
  const name = req.params.name;
  const payload = req.body || {};
  try {
    const p = await profiles.setProfile(name, payload);
    return res.json(p);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  // spawn player on a random free tile
  function findSpawn() {
    for (let i = 0; i < 2000; i++) {
      const tx = Math.floor(Math.random() * GRID_W)
      const ty = Math.floor(Math.random() * GRID_H)
      if (!isTileBlocked(tx, ty)) return { tx, ty }
    }
    return { tx: 1, ty: 1 }
  }
  const spawn = findSpawn()
  const center = tileToWorld(spawn.tx, spawn.ty)
  players[socket.id] = {
    id: socket.id,
    tileX: spawn.tx,
    tileY: spawn.ty,
    x: center.x,
    y: center.y,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    name: `Guest_${socket.id.slice(0,4)}`,
    isNPC: false
  };
  players[socket.id].lastProcessedInput = 0;

  socket.emit('init', { id: socket.id, players });
  socket.broadcast.emit('playerJoined', players[socket.id]);

  // allow client to set a display name (persisted client-side)
  socket.on('join', (name) => {
    if (!players[socket.id]) return;
    players[socket.id].name = typeof name === 'string' && name.length ? name : players[socket.id].name;
    // notify others about updated player
    io.emit('playerJoined', players[socket.id]);
    // send updated init to the joining client
    socket.emit('init', { id: socket.id, players });
  });

  socket.on('input', (input) => {
    const p = players[socket.id];
    if (!p || !input) return;
    // convert input to a grid move
    const { seq, dir } = input;
    if (typeof seq === 'number') p.lastProcessedInput = seq;
    let ntx = p.tileX
    let nty = p.tileY
    if (dir === 'left') ntx = p.tileX - 1;
    if (dir === 'right') ntx = p.tileX + 1;
    if (dir === 'up') nty = p.tileY - 1;
    if (dir === 'down') nty = p.tileY + 1;
    if (!isTileBlocked(ntx, nty)) {
      const c = tileToWorld(ntx, nty)
      p.tileX = ntx; p.tileY = nty; p.x = c.x; p.y = c.y
    } else {
      try { socket.emit('correction', { x: p.x, y: p.y, lastProcessedInput: p.lastProcessedInput || 0 }) } catch (e) {}
    }
  });

  // handle tile-based move commands
  socket.on('move', (dir) => {
    const p = players[socket.id];
    if (!p) return;
    let ntx = p.tileX
    let nty = p.tileY
    if (dir === 'left') ntx = p.tileX - 1;
    if (dir === 'right') ntx = p.tileX + 1;
    if (dir === 'up') nty = p.tileY - 1;
    if (dir === 'down') nty = p.tileY + 1;
    if (!isTileBlocked(ntx, nty)) {
      const c = tileToWorld(ntx, nty)
      p.tileX = ntx; p.tileY = nty; p.x = c.x; p.y = c.y
    } else {
      try { socket.emit('correction', { x: p.x, y: p.y, lastProcessedInput: p.lastProcessedInput || 0 }) } catch (e) {}
    }
  });

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
    delete players[socket.id];
    io.emit('playerLeft', socket.id);
  });
});

// Broadcast authoritative state at 20Hz with timestamp
setInterval(() => {
  const payload = { timestamp: Date.now(), players };
  io.emit('state', payload);
}, 1000 / 20);

// expose a small map descriptor for clients
app.get('/map', (req, res) => {
  res.json({ width: WORLD_WIDTH, height: WORLD_HEIGHT, tileSize: TILE_SIZE, gridW: GRID_W, gridH: GRID_H, obstacles })
})

server.listen(PORT, () => console.log(`Project2 backend running on ${PORT}`));

