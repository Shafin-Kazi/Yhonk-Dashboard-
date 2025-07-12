const driverModel = require('../models/driverModel');

// Get all drivers
async function getAllDrivers(req, res) {
  try {
    const drivers = await driverModel.getAllDrivers();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
}

// Add a new driver
async function addDriver(req, res) {
  try {
    const id = await driverModel.addDriver(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add driver' });
  }
}

// Get a single driver
async function getDriverById(req, res) {
  try {
    const driver = await driverModel.getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch driver' });
  }
}

// Update a driver
async function updateDriver(req, res) {
  try {
    await driverModel.updateDriver(req.params.id, req.body);
    res.json({ message: 'Driver updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update driver' });
  }
}

// Delete a driver
async function deleteDriver(req, res) {
  try {
    await driverModel.deleteDriver(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete driver' });
  }
}

module.exports = {
  getAllDrivers,
  addDriver,
  getDriverById,
  updateDriver,
  deleteDriver
};
