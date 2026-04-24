// Simple in-memory entity store for Project2
// Exports helpers to create, read, update, and remove entities.

const entities = {}
let nextId = 1

function makeId(prefix = 'e') {
  return `${prefix}-${nextId++}`
}

function createEntity(type, props = {}) {
  const id = makeId(type)
  const now = Date.now()
  const ent = Object.assign({ id, type, createdAt: now, updatedAt: now }, props)
  entities[id] = ent
  return ent
}

function updateEntity(id, patch) {
  if (!entities[id]) return null
  entities[id] = Object.assign({}, entities[id], patch, { updatedAt: Date.now() })
  return entities[id]
}

function removeEntity(id) {
  if (!entities[id]) return false
  delete entities[id]
  return true
}

function getEntity(id) {
  return entities[id] || null
}

function getAll() {
  return Object.values(entities)
}

function seedSample() {
  // some example world objects
  entities['player-1'] = { id: 'player-1', type: 'player', x: 160, y: 160 }
  entities['npc-1'] = { id: 'npc-1', type: 'npc', x: 320, y: 160 }
  entities['rock-1'] = { id: 'rock-1', type: 'rock', x: 200, y: 300, resource: 'stone', hp: 3 }
  entities['tree-1'] = { id: 'tree-1', type: 'tree', x: 400, y: 260, resource: 'wood', hp: 5 }
}

module.exports = {
  createEntity,
  updateEntity,
  removeEntity,
  getEntity,
  getAll,
  seedSample,
}
