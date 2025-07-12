const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/deviceInstallationChecklistController');

router.get('/', checklistController.getAllChecklists);
const upload = require('../middleware/upload');

router.post('/', upload, checklistController.addChecklist);
router.get('/:id', checklistController.getChecklistById);
router.put('/:id', checklistController.updateChecklist);
router.delete('/:id', checklistController.deleteChecklist);

module.exports = router;
