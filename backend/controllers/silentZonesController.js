const silentZoneModel = require('../models/silentZoneModel');

// Get all silent zones
async function getAllSilentZones(req, res) {
  try {
    const zones = await silentZoneModel.getAllSilentZones(req.query);
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch silent zones' });
  }
}

// Add a new silent zone
async function addSilentZone(req, res) {
  try {
    const id = await silentZoneModel.addSilentZone(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add silent zone' });
  }
}

// Get a single silent zone
async function getSilentZoneById(req, res) {
  try {
    const zone = await silentZoneModel.getSilentZoneById(req.params.id);
    if (!zone) return res.status(404).json({ error: 'Silent zone not found' });
    res.json(zone);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch silent zone' });
  }
}

// Update a silent zone
async function updateSilentZone(req, res) {
  try {
    await silentZoneModel.updateSilentZone(req.params.id, req.body);
    res.json({ message: 'Silent zone updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update silent zone' });
  }
}

// Delete a silent zone
async function deleteSilentZone(req, res) {
  try {
    await silentZoneModel.deleteSilentZone(req.params.id);
    res.json({ message: 'Silent zone deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete silent zone' });
  }
}

module.exports = {
  getAllSilentZones,
  addSilentZone,
  getSilentZoneById,
  updateSilentZone,
  deleteSilentZone
};
