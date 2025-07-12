const checklistModel = require('../models/deviceInstallationChecklistModel');

// Get all checklists
async function getAllChecklists(req, res) {
  try {
    const checklists = await checklistModel.getAllChecklists();
    res.json(checklists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch checklists' });
  }
}

// Add a new checklist
async function addChecklist(req, res) {
  try {
    const checklistData = {
      ...req.body,
      photo_path: req.file ? req.file.path : null
    };
    const id = await checklistModel.addChecklist(checklistData);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add checklist' });
  }
}

// Get a single checklist
async function getChecklistById(req, res) {
  try {
    const checklist = await checklistModel.getChecklistById(req.params.id);
    if (!checklist) return res.status(404).json({ error: 'Checklist not found' });
    res.json(checklist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch checklist' });
  }
}

// Update a checklist
async function updateChecklist(req, res) {
  try {
    await checklistModel.updateChecklist(req.params.id, req.body);
    res.json({ message: 'Checklist updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update checklist' });
  }
}

// Delete a checklist
async function deleteChecklist(req, res) {
  try {
    await checklistModel.deleteChecklist(req.params.id);
    res.json({ message: 'Checklist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete checklist' });
  }
}

module.exports = {
  getAllChecklists,
  addChecklist,
  getChecklistById,
  updateChecklist,
  deleteChecklist
};
