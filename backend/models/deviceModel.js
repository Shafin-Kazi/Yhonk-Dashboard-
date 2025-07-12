const db = require('../db');

// Get all devices
async function getAllDevices() {
  const [rows] = await db.query('SELECT * FROM devices');
  return rows;
}

// Add a new device
async function addDevice(device) {
  const { imei_number, sim_number, serial_number, description, status, last_seen, battery_level, signal_strength } = device;
  const [result] = await db.query(
    'INSERT INTO devices (imei_number, sim_number, serial_number, description, status, last_seen, battery_level, signal_strength) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [imei_number, sim_number, serial_number, description, status, last_seen, battery_level, signal_strength]
  );
  return result.insertId;
}

// Get a single device by ID
async function getDeviceById(id) {
  const [rows] = await db.query('SELECT * FROM devices WHERE id = ?', [id]);
  return rows[0];
}

// Update a device
async function updateDevice(id, device) {
  const { imei_number, sim_number, serial_number, description, status, last_seen, battery_level, signal_strength } = device;
  await db.query(
    'UPDATE devices SET imei_number=?, sim_number=?, serial_number=?, description=?, status=?, last_seen=?, battery_level=?, signal_strength=? WHERE id=?',
    [imei_number, sim_number, serial_number, description, status, last_seen, battery_level, signal_strength, id]
  );
}

// Delete a device
async function deleteDevice(id) {
  await db.query('DELETE FROM devices WHERE id = ?', [id]);
}

module.exports = {
  getAllDevices,
  addDevice,
  getDeviceById,
  updateDevice,
  deleteDevice
};
