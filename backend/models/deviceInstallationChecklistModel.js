const db = require('../db');

// Get all checklists
async function getAllChecklists() {
  const [rows] = await db.query('SELECT * FROM device_installation_checklists');
  return rows;
}

// Add a new checklist
async function addChecklist(checklist) {
  const { device_id, status, comments, otp, photo_path } = checklist;
  const [result] = await db.query(
    'INSERT INTO device_installation_checklists (device_id, status, comments, otp, photo_path) VALUES (?, ?, ?, ?, ?)',
    [device_id, status, comments, otp, photo_path]
  );
  return result.insertId;
}

// Get a single checklist by ID
async function getChecklistById(id) {
  const [rows] = await db.query('SELECT * FROM device_installation_checklists WHERE id = ?', [id]);
  return rows[0];
}

// Update a checklist
async function updateChecklist(id, checklist) {
  const { device_id, status, comments, otp, photo_path } = checklist;
  await db.query(
    'UPDATE device_installation_checklists SET device_id=?, status=?, comments=?, otp=?, photo_path=? WHERE id=?',
    [device_id, status, comments, otp, photo_path, id]
  );
}

// Delete a checklist
async function deleteChecklist(id) {
  await db.query('DELETE FROM device_installation_checklists WHERE id = ?', [id]);
}

module.exports = {
  getAllChecklists,
  addChecklist,
  getChecklistById,
  updateChecklist,
  deleteChecklist
};
