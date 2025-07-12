const deviceModel = require('../models/deviceModel');

// Get all devices
async function getAllDevices(req, res) {
  try {
    const devices = await deviceModel.getAllDevices();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add a new device
async function addDevice(req, res) {
  try {
    const deviceId = await deviceModel.addDevice(req.body);
    res.json({ id: deviceId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a device
async function updateDevice(req, res) {
  try {
    await deviceModel.updateDevice(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a device
async function deleteDevice(req, res) {
  try {
    await deviceModel.deleteDevice(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevice
};
