const logModel = require('../models/deviceLogModel');

// Get all logs for a specific device
async function getLogsByDeviceId(req, res) {
  try {
    const logs = await logModel.getLogsByDeviceId(req.params.deviceId, req.query);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
}

// Add a new log
async function addLog(req, res) {
  try {
    const id = await logModel.addLog(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add log' });
  }
}

async function getAllLogs(req, res) {
  try {
    const logs = await logModel.getAllLogs(req.query);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
}

module.exports = {
  getLogsByDeviceId,
  getAllLogs,
  addLog,
  getAllDeviceLogs
};

async function getAllDeviceLogs(req, res) {
  try {
    const logs = await logModel.getAllLogs(req.query);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
}
