const db = require('../db');

async function getVehiclesHeatmap(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT
        WEEK(registration_date, 1) as week,
        DAYOFWEEK(registration_date) as day,
        COUNT(*) as count
      FROM vehicles
      WHERE registration_date >= DATE_SUB(NOW(), INTERVAL 4 WEEK)
      GROUP BY week, day
    `);
    const heatmap = Array(4).fill(0).map(() => Array(7).fill(0));
    const currentWeek = (new Date()).getWeek();
    rows.forEach(row => {
      const weekIndex = 3 - (currentWeek - row.week);
      const dayIndex = row.day - 1;
      if (weekIndex >= 0 && weekIndex < 4) {
        heatmap[weekIndex][dayIndex] = row.count;
      }
    });
    res.json({ heatmap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

async function getDriversInfo(req, res) {
  try {
    const [total] = await db.query('SELECT COUNT(*) as count FROM drivers');
    const [active] = await db.query('SELECT COUNT(*) as count FROM drivers WHERE status = "Active"');
    const [inactive] = await db.query('SELECT COUNT(*) as count FROM drivers WHERE status != "Active"');
    const [newThisMonth] = await db.query('SELECT COUNT(*) as count FROM drivers WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)');
    res.json({
      total: total[0].count,
      active: active[0].count,
      inactive: inactive[0].count,
      newThisMonth: newThisMonth[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getDevicesInfo(req, res) {
  try {
    const [total] = await db.query('SELECT COUNT(*) as count FROM devices');
    const [active] = await db.query('SELECT COUNT(*) as count FROM devices WHERE status = "Active"');
    res.json({
      totalDevices: total[0].count,
      activeDevices: active[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getVehiclesHeatmap,
  getDriversInfo,
  getDevicesInfo
};
