const express = require('express');
const router = express.Router();
const logController = require('../controllers/deviceLogController');

router.get('/', logController.getAllLogs);
router.post('/', logController.addLog);
router.get('/:deviceId', logController.getLogsByDeviceId);

module.exports = router;
