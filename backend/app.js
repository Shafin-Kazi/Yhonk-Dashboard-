const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (add more as you build)
app.get('/', (req, res) => {
  res.send('Yhonk Dashboard Backend is running!');
});

const vehicleRoutes = require('./routes/vehicles');
app.use('/api/vehicles', vehicleRoutes);

const driverRoutes = require('./routes/drivers');
app.use('/api/drivers', driverRoutes);

const deviceRoutes = require('./routes/devices');
app.use('/api/devices', deviceRoutes);

const silentZoneRoutes = require('./routes/silentZones');
app.use('/api/silent-zones', silentZoneRoutes);

const hornDurationReportRoutes = require('./routes/hornDurationReports');
app.use('/api/horn-duration-reports', hornDurationReportRoutes);

const hornSummaryReportRoutes = require('./routes/hornSummaryReports');
app.use('/api/horn-summary-reports', hornSummaryReportRoutes);

const hornSummaryChartRoutes = require('./routes/hornSummaryChart');
app.use('/api/horn-summary-chart', hornSummaryChartRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const checklistRoutes = require('./routes/deviceInstallationChecklist');
app.use('/api/device-installation-checklists', checklistRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

const deviceLogRoutes = require('./routes/deviceLogs');
app.use('/api/device-logs', deviceLogRoutes);

// Example: Vehicle routes will be added here later
// const vehicleRoutes = require('./routes/vehicles');
// app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
