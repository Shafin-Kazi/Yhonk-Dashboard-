const express = require('express');
const router = express.Router();
const hornSummaryChartController = require('../controllers/hornSummaryChartController');

router.get('/', hornSummaryChartController.getChart);
router.get('/groups', hornSummaryChartController.getGroups);
router.get('/vehicles', hornSummaryChartController.getVehicles);
router.get('/drivers', hornSummaryChartController.getDrivers);

module.exports = router;