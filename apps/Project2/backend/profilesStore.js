const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const FILE = path.join(DATA_DIR, 'profiles.json');

async function ensureDataFile() {
  await fs.promises.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.promises.access(FILE);
  } catch (e) {
    await fs.promises.writeFile(FILE, JSON.stringify({}, null, 2), 'utf8');
  }
}

async function loadAll() {
  await ensureDataFile();
  const raw = await fs.promises.readFile(FILE, 'utf8');
  try {
    return JSON.parse(raw || '{}');
  } catch (e) {
    return {};
  }
}

async function saveAll(obj) {
  await ensureDataFile();
  await fs.promises.writeFile(FILE, JSON.stringify(obj, null, 2), 'utf8');
}

async function getProfile(name) {
  if (!name) return null;
  const all = await loadAll();
  return all[name] || null;
}

async function setProfile(name, profile) {
  if (!name) throw new Error('Missing profile name');
  const all = await loadAll();
  all[name] = profile || {};
  await saveAll(all);
  return all[name];
}

module.exports = { getProfile, setProfile };
