const db = require('../db');

// Get all vehicles
async function getAllVehicles() {
  const [rows] = await db.query('SELECT * FROM vehicles');
  return rows;
}

// Add a new vehicle
async function addVehicle(vehicle) {
  const { registration_number, registration_date, brand, model, vehicle_type, ownership, horn_decibel, driven_by, uses } = vehicle;
  const [result] = await db.query(
    'INSERT INTO vehicles (registration_number, registration_date, brand, model, vehicle_type, ownership, horn_decibel, driven_by, uses) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [registration_number, registration_date, brand, model, vehicle_type, ownership, horn_decibel, driven_by, uses]
  );
  return result.insertId;
}

// Get a single vehicle by ID
async function getVehicleById(id) {
  const [rows] = await db.query('SELECT * FROM vehicles WHERE id = ?', [id]);
  return rows[0];
}

// Update a vehicle
async function updateVehicle(id, vehicle) {
  const { registration_number, registration_date, brand, model, vehicle_type, ownership, horn_decibel, driven_by, uses } = vehicle;
  await db.query(
    'UPDATE vehicles SET registration_number=?, registration_date=?, brand=?, model=?, vehicle_type=?, ownership=?, horn_decibel=?, driven_by=?, uses=? WHERE id=?',
    [registration_number, registration_date, brand, model, vehicle_type, ownership, horn_decibel, driven_by, uses, id]
  );
}

// Delete a vehicle
async function deleteVehicle(id) {
  await db.query('DELETE FROM vehicles WHERE id = ?', [id]);
}

module.exports = {
  getAllVehicles,
  addVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
