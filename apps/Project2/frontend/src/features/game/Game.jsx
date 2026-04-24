import React, { useEffect, useRef, useContext, useState } from 'react'
import { socket } from '../../socket'
import { PlayerContext } from '../../PlayerContext'
import ProfileEditor from '../profile/ProfileEditor'

export default function Game() {
  const canvasRef = useRef(null)
  const [players, setPlayers] = useState({})
  const [myId, setMyId] = useState(null)
  const [showEditor, setShowEditor] = useState(false)

  const local = useRef({ x: 0, y: 0, seq: 0, pendingInputs: [] })
  // local now tracks tile positions
  // will initialize tileX/tileY when server sends init
  const otherBuffers = useRef({})
  const interpolationDelay = 100
  const spriteImg = useRef(null)
  const [mapData, setMapData] = useState(null)
  const mapRef = useRef(null)
  const camera = useRef({ x: 0, y: 0 })
  const CAMERA_LERP = 0.16
  const pathRef = useRef(null)
  const movingRef = useRef(false)
  const destRef = useRef(null)
  const renderRef = useRef({ x: local.current.x, y: local.current.y })
  const MOVE_MS = 180
  const CORRECT_MS = 120
  const easeInOut = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  // create SVG sprite as data URL
  useEffect(() => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
        <defs>
          <linearGradient id='g' x1='0' x2='1'>
            <stop offset='0' stop-color='%2392E3A9'/>
            <stop offset='1' stop-color='%234CAF50'/>
          </linearGradient>
        </defs>
        <rect x='6' y='18' width='36' height='20' rx='4' fill='url(%23g)' stroke='%230b3' stroke-width='1'/>
        <circle cx='24' cy='12' r='8' fill='%23FFECB3' stroke='%23B57B17' stroke-width='1'/>
        <rect x='20' y='8' width='8' height='8' rx='2' fill='%23FFCC80' opacity='0.9'/>
        <rect x='30' y='22' width='6' height='10' rx='2' fill='%23808' opacity='0.12'/>
        <rect x='12' y='22' width='6' height='10' rx='2' fill='%23808' opacity='0.12'/>
        <path d='M30 20 L36 16' stroke='%23D0D0D0' stroke-width='2' stroke-linecap='round' />
      </svg>
    `
    const url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
    const img = new Image()
    img.src = url
    spriteImg.current = img
  }, [])

  useEffect(() => { mapRef.current = mapData }, [mapData])

  // click-to-move handler: compute path and execute
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      const worldX = cx + camera.current.x
      const worldY = cy + camera.current.y
      const md = mapRef.current
      if (!md) return
      const tileSize = md.tileSize || 32
      const tx = Math.floor(worldX / tileSize)
      const ty = Math.floor(worldY / tileSize)
      const gridW = md.gridW || Math.floor(md.width / tileSize)
      const gridH = md.gridH || Math.floor(md.height / tileSize)
      const blocked = getBlockedSet()
      const targetKey = `${tx},${ty}`
      if (blocked.has(targetKey)) return
      // compute start from smoothed render position so cancelling is immediate
      const r = renderRef.current || { x: 0, y: 0 }
      const startTx = Math.floor(r.x / tileSize)
      const startTy = Math.floor(r.y / tileSize)
      if (startTx === tx && startTy === ty) return
      const start = { tx: startTx, ty: startTy }
      const path = findPath(start, { tx, ty }, blocked, gridW, gridH)
      if (!path) return
      // cancel previous path and any in-progress move immediately
      pathRef.current = null
      local.current.move = null
      // snap logical position to current render so new path starts cleanly
      local.current.x = r.x
      local.current.y = r.y
      local.current.tileX = startTx
      local.current.tileY = startTy
      destRef.current = { tx, ty }
      executePath(path)
    }
    canvas.addEventListener('click', onClick)
    return () => canvas.removeEventListener('click', onClick)
  }, [])

  const { name, setName } = useContext(PlayerContext)

  useEffect(() => {
    socket.on('connect', () => console.log('socket connected', socket.id))
    socket.on('disconnect', () => console.log('socket disconnected'))
    socket.on('init', (data) => {
      setMyId(data.id)
      setPlayers(data.players || {})
      const me = data.players && data.players[data.id]
      if (me) {
        local.current.x = me.x
        local.current.y = me.y
        local.current.tileX = typeof me.tileX === 'number' ? me.tileX : Math.floor(me.x / (mapData?.tileSize || 32))
        local.current.tileY = typeof me.tileY === 'number' ? me.tileY : Math.floor(me.y / (mapData?.tileSize || 32))
        // initialize render position to server position to avoid visual snap
        renderRef.current.x = local.current.x
        renderRef.current.y = local.current.y
      }
    })

    socket.on('state', (payload) => {
      const { timestamp, players: serverPlayers } = payload || {}
      if (serverPlayers) {
        Object.keys(serverPlayers).forEach((id) => {
          if (id === myId) return
          const p = serverPlayers[id]
          if (!otherBuffers.current[id]) otherBuffers.current[id] = []
          otherBuffers.current[id].push({ t: timestamp, x: p.x, y: p.y })
          if (otherBuffers.current[id].length > 10) otherBuffers.current[id].shift()
        })
        setPlayers({ ...serverPlayers })
      }

      if (myId && serverPlayers && serverPlayers[myId]) {
        const serverMe = serverPlayers[myId]
        const tileSize = mapData?.tileSize || 32
        const srvX = serverMe.x
        const srvY = serverMe.y
        local.current.tileX = typeof serverMe.tileX === 'number' ? serverMe.tileX : Math.floor(srvX / tileSize)
        local.current.tileY = typeof serverMe.tileY === 'number' ? serverMe.tileY : Math.floor(srvY / tileSize)
        // interpolate render position toward authoritative server position to avoid snapping
        const now = Date.now()
        local.current.move = { from: { x: renderRef.current.x, y: renderRef.current.y }, to: { x: srvX, y: srvY }, start: now, end: now + CORRECT_MS }
      }
    })

    socket.on('playerJoined', (p) => setPlayers((s) => ({ ...s, [p.id]: p })))
    socket.on('playerLeft', (id) => setPlayers((s) => {
      const copy = { ...s }
      delete copy[id]
      delete otherBuffers.current[id]
      return copy
    }))
    socket.on('correction', (data) => {
      if (!data) return
      const { x, y } = data
      const tileSize = mapData?.tileSize || 32
      local.current.tileX = Math.floor(x / tileSize)
      local.current.tileY = Math.floor(y / tileSize)
      const now = Date.now()
      // smoothly correct render position
      local.current.move = { from: { x: renderRef.current.x, y: renderRef.current.y }, to: { x, y }, start: now, end: now + CORRECT_MS }
      if (myId) setPlayers((s) => ({ ...s, [myId]: { ...(s[myId]||{}), x, y } }))
    })

    const handleKey = (e) => {
      console.log('key', e.key)
      if (e.repeat) return
      let dir = null
      if (e.key === 'ArrowLeft') dir = 'left'
      if (e.key === 'ArrowRight') dir = 'right'
      if (e.key === 'ArrowUp') dir = 'up'
      if (e.key === 'ArrowDown') dir = 'down'
      if (!dir) return
      // attempt optimistic tile move locally, validate against client-side map if available
      const tileSize = mapData?.tileSize || 32
      const curTx = typeof local.current.tileX === 'number' ? local.current.tileX : Math.floor(local.current.x / tileSize)
      const curTy = typeof local.current.tileY === 'number' ? local.current.tileY : Math.floor(local.current.y / tileSize)
      let ntx = curTx
      let nty = curTy
      if (dir === 'left') ntx = curTx - 1
      if (dir === 'right') ntx = curTx + 1
      if (dir === 'up') nty = curTy - 1
      if (dir === 'down') nty = curTy + 1
      let blockedLocal = false
      if (mapData) {
        // check tile intersection with obstacles
        const tileRect = { x: ntx * tileSize, y: nty * tileSize, w: tileSize, h: tileSize }
        for (const ob of mapData.obstacles || []) {
          if (!(tileRect.x + tileRect.w <= ob.x || tileRect.x >= ob.x + ob.w || tileRect.y + tileRect.h <= ob.y || tileRect.y >= ob.y + ob.h)) {
            blockedLocal = true
            break
          }
        }
      }
      // send move to server
      console.log('emit move', dir)
      socket.emit('move', dir)
      // cancel any click destination when manually moving
      destRef.current = null
      if (!blockedLocal) {
        const prevCx = (curTx * tileSize) + tileSize / 2
        const prevCy = (curTy * tileSize) + tileSize / 2
        const cx = ntx * tileSize + tileSize / 2
        const cy = nty * tileSize + tileSize / 2
        const now = Date.now()
        local.current.tileX = ntx
        local.current.tileY = nty
        local.current.move = { from: { x: prevCx, y: prevCy }, to: { x: cx, y: cy }, start: now, end: now + MOVE_MS }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      socket.off('init')
      socket.off('state')
      socket.off('playerJoined')
      socket.off('playerLeft')
      socket.off('correction')
    }
  }, [])

  // load map descriptor from server once on mount
  useEffect(() => {
    let mounted = true
    async function loadMap() {
      try {
        const res = await fetch('http://localhost:3001/map')
        if (!res.ok) return
        const data = await res.json()
        if (mounted) {
          setMapData(data)
          mapRef.current = data
        }
      } catch (e) {
        // ignore
      }
    }
    loadMap()
    return () => { mounted = false }
  }, [])

  function applyInput(state, dir) {
    const speed = 4
    if (dir === 'left') state.x -= speed
    if (dir === 'right') state.x += speed
    if (dir === 'up') state.y -= speed
    if (dir === 'down') state.y += speed
  }

  // derive blocked tile set on the client from mapData
  const getBlockedSet = () => {
    const s = new Set()
    const md = mapRef.current
    if (!md) return s
    const tileSize = md.tileSize || 32
    const gridW = md.gridW || Math.floor(md.width / tileSize)
    const gridH = md.gridH || Math.floor(md.height / tileSize)
    for (const ob of md.obstacles || []) {
      const sx = Math.floor(ob.x / tileSize)
      const sy = Math.floor(ob.y / tileSize)
      const ex = Math.floor((ob.x + ob.w) / tileSize)
      const ey = Math.floor((ob.y + ob.h) / tileSize)
      for (let tx = sx; tx <= ex; tx++) {
        for (let ty = sy; ty <= ey; ty++) {
          if (tx >= 0 && tx < gridW && ty >= 0 && ty < gridH) s.add(`${tx},${ty}`)
        }
      }
    }
    return s
  }

  // A* pathfinding on grid (returns array of {tx,ty} including start and goal)
  function findPath(start, goal, blockedSet, gridW, gridH) {
    const key = (t) => `${t.tx},${t.ty}`
    const inBounds = (tx, ty) => tx >= 0 && ty >= 0 && tx < gridW && ty < gridH
    const h = (a, b) => Math.abs(a.tx - b.tx) + Math.abs(a.ty - b.ty)
    const startKey = key(start)
    const goalKey = key(goal)
    const open = new Map()
    const closed = new Set()
    open.set(startKey, { tx: start.tx, ty: start.ty, g: 0, f: h(start, goal), parent: null })
    while (open.size) {
      let currentKey = null; let current = null
      for (const [k, v] of open.entries()) {
        if (!current || v.f < current.f) { currentKey = k; current = v }
      }
      if (currentKey === goalKey) {
        const path = []
        let node = current
        while (node) { path.push({ tx: node.tx, ty: node.ty }); node = node.parent }
        return path.reverse()
      }
      open.delete(currentKey)
      closed.add(currentKey)
      const neighbors = [ {tx: current.tx-1, ty: current.ty}, {tx: current.tx+1, ty: current.ty}, {tx: current.tx, ty: current.ty-1}, {tx: current.tx, ty: current.ty+1} ]
      for (const nb of neighbors) {
        const nk = `${nb.tx},${nb.ty}`
        if (!inBounds(nb.tx, nb.ty)) continue
        if (blockedSet.has(nk)) continue
        if (closed.has(nk)) continue
        const tentativeG = current.g + 1
        const existing = open.get(nk)
        const f = tentativeG + h(nb, goal)
        if (!existing || tentativeG < existing.g) {
          open.set(nk, { tx: nb.tx, ty: nb.ty, g: tentativeG, f, parent: current })
        }
      }
    }
    return null
  }

  // execute path: send moves to server step-by-step with small delay
  async function executePath(path) {
    if (!path || path.length < 2) return
    movingRef.current = true
    pathRef.current = path
    const md = mapRef.current
    const tileSize = md?.tileSize || 32
    for (let i = 1; i < path.length; i++) {
      if (pathRef.current !== path) break // cancelled or replaced
      const cur = path[i-1]
      const nxt = path[i]
      let dir = null
      if (nxt.tx === cur.tx - 1) dir = 'left'
      if (nxt.tx === cur.tx + 1) dir = 'right'
      if (nxt.ty === cur.ty - 1) dir = 'up'
      if (nxt.ty === cur.ty + 1) dir = 'down'
      if (!dir) continue
      socket.emit('move', dir)
      // optimistic timed move (interpolate visually)
      const prevCx = (cur.tx * tileSize) + tileSize / 2
      const prevCy = (cur.ty * tileSize) + tileSize / 2
      const cx = nxt.tx * tileSize + tileSize / 2
      const cy = nxt.ty * tileSize + tileSize / 2
      const now = Date.now()
      local.current.tileX = nxt.tx
      local.current.tileY = nxt.ty
      local.current.move = { from: { x: prevCx, y: prevCy }, to: { x: cx, y: cy }, start: now, end: now + MOVE_MS }
      await new Promise(r => setTimeout(r, MOVE_MS))
    }
    // only clear destination/moving state if this execution is still the active path
    if (pathRef.current === path) {
      movingRef.current = false
      pathRef.current = null
      destRef.current = null
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

          // smooth render position: prefer active move interpolation, otherwise lerp toward logical position
          const renderPos = renderRef.current
          const SMOOTH_FACTOR = 0.22
          const now = Date.now()
          if (local.current.move) {
            const m = local.current.move
            const dur = Math.max(1, m.end - m.start)
            const t = Math.min(1, (now - m.start) / dur)
            const e = easeInOut(t)
            renderPos.x = m.from.x + (m.to.x - m.from.x) * e
            renderPos.y = m.from.y + (m.to.y - m.from.y) * e
            if (t >= 1) {
              // finalize move
              local.current.x = m.to.x
              local.current.y = m.to.y
              local.current.move = null
              renderPos.x = local.current.x
              renderPos.y = local.current.y
            }
          } else {
            const targetXPos = (typeof local.current.x === 'number') ? local.current.x : renderPos.x
            const targetYPos = (typeof local.current.y === 'number') ? local.current.y : renderPos.y
            renderPos.x += (targetXPos - renderPos.x) * SMOOTH_FACTOR
            renderPos.y += (targetYPos - renderPos.y) * SMOOTH_FACTOR
          }

        // compute camera target centered on smoothed local player
        if (mapData) {
          const targetX = renderPos.x - canvas.width / 2
          const targetY = renderPos.y - canvas.height / 2
          const maxX = Math.max(0, mapData.width - canvas.width)
          const maxY = Math.max(0, mapData.height - canvas.height)
          // clamp target
          const tx = Math.max(0, Math.min(maxX, targetX))
          const ty = Math.max(0, Math.min(maxY, targetY))
          camera.current.x += (tx - camera.current.x) * CAMERA_LERP
          camera.current.y += (ty - camera.current.y) * CAMERA_LERP
        } else {
          // follow without map bounds (use smoothed position)
          const tx = renderPos.x - canvas.width / 2
          const ty = renderPos.y - canvas.height / 2
          camera.current.x += (tx - camera.current.x) * CAMERA_LERP
          camera.current.y += (ty - camera.current.y) * CAMERA_LERP
        }

        // translate drawing context to camera
        ctx.save()
        ctx.translate(-Math.round(camera.current.x), -Math.round(camera.current.y))

        // draw world bounds, grid and obstacles if available
        if (mapData) {
          // grid
          ctx.save()
          ctx.strokeStyle = 'rgba(255,255,255,0.03)'
          ctx.lineWidth = 1
          const tileSize = mapData.tileSize || 32
          for (let gx = 0; gx <= mapData.gridW; gx++) {
            const x = gx * tileSize
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, mapData.height); ctx.stroke()
          }
          for (let gy = 0; gy <= mapData.gridH; gy++) {
            const y = gy * tileSize
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(mapData.width, y); ctx.stroke()
          }
          ctx.restore()
          // world bounds
          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
          ctx.lineWidth = 2
          ctx.strokeRect(0, 0, mapData.width, mapData.height)
          // obstacles
          ctx.fillStyle = 'rgba(60,60,60,0.95)'
          ctx.strokeStyle = 'rgba(0,0,0,0.6)'
          for (const ob of mapData.obstacles || []) {
            ctx.fillRect(ob.x, ob.y, ob.w, ob.h)
            ctx.strokeRect(ob.x, ob.y, ob.w, ob.h)
          }
          // destination marker (if any)
          if (destRef.current) {
            const tileSize = mapData.tileSize || 32
            const d = destRef.current
            const dx = d.tx * tileSize + tileSize / 2
            const dy = d.ty * tileSize + tileSize / 2
            ctx.save()
            ctx.fillStyle = 'rgba(255,200,0,0.95)'
            ctx.strokeStyle = 'rgba(0,0,0,0.6)'
            ctx.beginPath()
            ctx.arc(dx, dy, Math.max(6, tileSize * 0.18), 0, Math.PI * 2)
            ctx.fill()
            ctx.lineWidth = 2
            ctx.stroke()
            // small cross
            ctx.strokeStyle = 'rgba(0,0,0,0.8)'
            ctx.beginPath()
            ctx.moveTo(dx - 6, dy - 6)
            ctx.lineTo(dx + 6, dy + 6)
            ctx.moveTo(dx + 6, dy - 6)
            ctx.lineTo(dx - 6, dy + 6)
            ctx.stroke()
            ctx.restore()
          }
        }

      const renderTime = now - interpolationDelay

      Object.values(players).forEach((p) => {
        // don't render other players until we've received our id from server
        if (!myId) return
        if (p.id === myId) return
        const buf = otherBuffers.current[p.id] || []
        if (buf.length >= 2) {
          let i = 0
          while (i < buf.length - 1 && buf[i + 1].t <= renderTime) i++
          const a = buf[i]
          const b = buf[Math.min(i + 1, buf.length - 1)]
          const span = b.t - a.t || 1
          const ratio = (renderTime - a.t) / span
          const x = a.x + (b.x - a.x) * ratio
          const y = a.y + (b.y - a.y) * ratio
          if (spriteImg.current && spriteImg.current.complete) {
            ctx.drawImage(spriteImg.current, x - 12, y - 18, 24, 36)
          } else {
            ctx.fillStyle = p.color || '#00f'
            ctx.fillRect(x - 10, y - 10, 20, 20)
          }
        } else {
          if (spriteImg.current && spriteImg.current.complete) {
            ctx.drawImage(spriteImg.current, p.x - 12, p.y - 18, 24, 36)
          } else {
            ctx.fillStyle = p.color || '#00f'
            ctx.fillRect(p.x - 10, p.y - 10, 20, 20)
          }
        }
      })

      // draw me from smoothed render position using SVG sprite
      const meX = renderRef.current.x
      const meY = renderRef.current.y
      if (spriteImg.current && spriteImg.current.complete) {
        ctx.drawImage(spriteImg.current, meX - 12, meY - 18, 24, 36)
      } else {
        ctx.fillStyle = '#4caf50'
        ctx.fillRect(meX - 10, meY - 10, 20, 20)
        ctx.strokeStyle = '#fff'
        ctx.strokeRect(meX - 12, meY - 12, 24, 24)
      }
      if (name) {
        ctx.fillStyle = '#fff'
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(name, meX, meY - 22)
      }

      // restore context after camera transform
      ctx.restore()

      requestAnimationFrame(render)
    }
    render()
  }, [players, myId])

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} width={800} height={600} />
      {!name && (
        <div style={{ position: 'absolute', left: 20, top: 20, background: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 6 }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: 6 }}>Enter display name</label>
          <NameForm setName={setName} />
        </div>
      )}

      {name && (
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
          <button onClick={() => setShowEditor(true)} style={{ padding: '8px 10px' }}>Edit Profile</button>
        </div>
      )}

      {showEditor && <ProfileEditor onClose={() => setShowEditor(false)} />}
    </div>
  )
}

function NameForm({ setName }) {
  const [val, setVal] = useState('')
  const container = { display: 'flex', gap: 8, alignItems: 'center' }
  const input = { padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: '#fff' }
  const btn = { padding: '8px 10px', borderRadius: 6, border: 'none', background: '#4caf50', color: '#fff', cursor: 'pointer' }
  return (
    <div style={container}>
      <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Player name" style={input} />
      <button onClick={() => {
        const n = String(val || '').trim()
        if (!n) return
        setName(n)
        try { localStorage.setItem('playerName', n) } catch (e) {}
        socket.emit('join', n)
      }} style={btn}>Join</button>
    </div>
  )
}
