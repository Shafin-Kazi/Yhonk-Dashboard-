const express = require('express');
const router = express.Router();
const silentZonesController = require('../controllers/silentZonesController');

router.get('/', silentZonesController.getAllSilentZones);
router.post('/', silentZonesController.addSilentZone);
router.get('/:id', silentZonesController.getSilentZoneById);
router.put('/:id', silentZonesController.updateSilentZone);
router.delete('/:id', silentZonesController.deleteSilentZone);

module.exports = router;
