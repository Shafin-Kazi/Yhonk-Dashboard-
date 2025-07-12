const db = require('../db');

async function getActivities(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT id, type, action, details, 
        DATE_FORMAT(created_at, '%e %b %Y %H:%i') as time
      FROM activities
      ORDER BY created_at DESC
      LIMIT 10
    `);
    res.json(rows || []);
  } catch (err) {
    res.json([]); // Always return an array
  }
}

async function getStats(req, res) {
  try {
    // Drivers
    const [drivers] = await db.query('SELECT COUNT(*) as total FROM drivers');
    const [newDrivers] = await db.query('SELECT COUNT(*) as newThisMonth FROM drivers WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)');

    // Vehicles
    const [vehicles] = await db.query('SELECT COUNT(*) as total FROM vehicles');
    const [newVehicles] = await db.query('SELECT COUNT(*) as newThisMonth FROM vehicles WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)');

    // Devices
    const [devices] = await db.query('SELECT COUNT(*) as total FROM devices');
    const [newDevices] = await db.query('SELECT COUNT(*) as newThisMonth FROM devices WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)');

    res.json({
      totalUsers: 0,
      changeUsers: '',
      totalDrivers: drivers[0].total || 0,
      changeDrivers: `+${newDrivers[0].newThisMonth || 0} this month`,
      totalVehicles: vehicles[0].total || 0,
      changeVehicles: `+${newVehicles[0].newThisMonth || 0} this month`,
      totalDevices: devices[0].total || 0,
      changeDevices: `+${newDevices[0].newThisMonth || 0} this month`
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch dashboard stats' });
  }
}

module.exports = { getStats, getActivities };
