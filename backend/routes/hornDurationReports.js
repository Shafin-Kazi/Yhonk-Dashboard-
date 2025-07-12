const express = require('express');
const router = express.Router();
const reportController = require('../controllers/hornDurationReportsController');

router.get('/', reportController.getAllReports);
router.post('/', reportController.addReport);
router.get('/:id', reportController.getReportById);
router.put('/:id', reportController.updateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
