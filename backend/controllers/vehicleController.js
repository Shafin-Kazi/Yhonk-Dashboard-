const vehicleModel = require('../models/vehicleModel');

// Get all vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await vehicleModel.getAllVehicles();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
}

// Add a new vehicle
async function addVehicle(req, res) {
  try {
    const id = await vehicleModel.addVehicle(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add vehicle' });
  }
}

// Get a single vehicle
async function getVehicleById(req, res) {
  try {
    const vehicle = await vehicleModel.getVehicleById(req.params.id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
}

// Update a vehicle
async function updateVehicle(req, res) {
  try {
    await vehicleModel.updateVehicle(req.params.id, req.body);
    res.json({ message: 'Vehicle updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
}

// Delete a vehicle
async function deleteVehicle(req, res) {
  try {
    await vehicleModel.deleteVehicle(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
}

module.exports = {
  getAllVehicles,
  addVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
