const hornSummaryChartModel = require('../models/hornSummaryChartModel');

async function getChart(req, res) {
  try {
    const { from, to, group, vehicle, driver } = req.query;
    const data = await hornSummaryChartModel.getChartData({ from, to, group, vehicle, driver });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}

async function getGroups(req, res) {
  try {
    const data = await hornSummaryChartModel.getGroups();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
}

async function getVehicles(req, res) {
  try {
    const { group } = req.query;
    const data = await hornSummaryChartModel.getVehicles(group);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
}

async function getDrivers(req, res) {
  try {
    const { vehicle } = req.query;
    const data = await hornSummaryChartModel.getDrivers(vehicle);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
}

module.exports = { getChart, getGroups, getVehicles, getDrivers };