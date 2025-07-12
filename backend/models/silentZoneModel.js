const db = require('../db');

// Get all silent zones
async function getAllSilentZones(filters = {}) {
  let query = 'SELECT * FROM silent_zones';
  const params = [];
  const whereClauses = [];

  if (filters.name) {
    whereClauses.push('name LIKE ?');
    params.push(`%${filters.name}%`);
  }
  if (filters.category) {
    whereClauses.push('category = ?');
    params.push(filters.category);
  }
  if (filters.status) {
    whereClauses.push('active = ?');
    params.push(filters.status === 'Active' ? 1 : 0);
  }

  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  const [rows] = await db.query(query, params);
  return rows;
}

// Add a new silent zone
async function addSilentZone(zone) {
  const { name, category, latitude, longitude, radius, active } = zone;
  const [result] = await db.query(
    'INSERT INTO silent_zones (name, category, latitude, longitude, radius, active) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category, latitude, longitude, radius, active]
  );
  return result.insertId;
}

// Get a single silent zone by ID
async function getSilentZoneById(id) {
  const [rows] = await db.query('SELECT * FROM silent_zones WHERE id = ?', [id]);
  return rows[0];
}

// Update a silent zone
async function updateSilentZone(id, zone) {
  const { name, category, latitude, longitude, radius, active } = zone;
  await db.query(
    'UPDATE silent_zones SET name=?, category=?, latitude=?, longitude=?, radius=?, active=? WHERE id=?',
    [name, category, latitude, longitude, radius, active, id]
  );
}

// Delete a silent zone
async function deleteSilentZone(id) {
  await db.query('DELETE FROM silent_zones WHERE id = ?', [id]);
}

module.exports = {
  getAllSilentZones,
  addSilentZone,
  getSilentZoneById,
  updateSilentZone,
  deleteSilentZone
};
