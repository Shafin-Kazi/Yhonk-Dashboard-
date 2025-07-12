const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/vehicles-heatmap', analyticsController.getVehiclesHeatmap);
router.get('/drivers-info', analyticsController.getDriversInfo);
router.get('/devices-info', analyticsController.getDevicesInfo);

module.exports = router;
