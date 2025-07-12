const reportModel = require('../models/hornDurationReportModel');

// Get all reports
async function getAllReports(req, res) {
  try {
    const reports = await reportModel.getAllReports(req.query);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
}

// Add a new report
async function addReport(req, res) {
  try {
    const id = await reportModel.addReport(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add report' });
  }
}

// Get a single report
async function getReportById(req, res) {
  try {
    const report = await reportModel.getReportById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch report' });
  }
}

// Update a report
async function updateReport(req, res) {
  try {
    await reportModel.updateReport(req.params.id, req.body);
    res.json({ message: 'Report updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update report' });
  }
}

// Delete a report
async function deleteReport(req, res) {
  try {
    await reportModel.deleteReport(req.params.id);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete report' });
  }
}

module.exports = {
  getAllReports,
  addReport,
  getReportById,
  updateReport,
  deleteReport
};
