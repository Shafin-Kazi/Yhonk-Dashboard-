const db = require('../db');

async function getChartData({ from, to, group, vehicle, driver }) {
  let query = `
    SELECT
      DATE(created_at) as date,
      SUM(normal + long_horn + multiple) as horn_count,
      COUNT(DISTINCT vehicle_id) as vehicle_count
    FROM horn_summary_reports
    WHERE created_at BETWEEN ? AND ?
  `;
  const params = [from, to];

  if (group) {
    query += ' AND group_name = ?';
    params.push(group);
  }
  if (vehicle) {
    query += ' AND vehicle_id = (SELECT id FROM vehicles WHERE registration_number = ?)';
    params.push(vehicle);
  }
  if (driver) {
    query += ' AND driver_id = ?';
    params.push(driver);
  }

  query += ' GROUP BY date ORDER BY date';

  const [rows] = await db.query(query, params);
  return rows;
}

async function getGroups() {
  const [rows] = await db.query('SELECT DISTINCT group_name FROM horn_summary_reports');
  return rows.map(row => row.group_name);
}

async function getVehicles(group) {
  let query = 'SELECT DISTINCT v.registration_number FROM vehicles v';
  const params = [];
  if (group) {
    query += ' JOIN horn_summary_reports hsr ON v.id = hsr.vehicle_id WHERE hsr.group_name = ?';
    params.push(group);
  }
  const [rows] = await db.query(query, params);
  return rows.map(row => row.registration_number);
}

async function getDrivers(vehicle) {
  let query = 'SELECT DISTINCT d.id, d.name FROM drivers d';
  const params = [];
  if (vehicle) {
    query += ' JOIN horn_summary_reports hsr ON d.id = hsr.driver_id JOIN vehicles v ON hsr.vehicle_id = v.id WHERE v.registration_number = ?';
    params.push(vehicle);
  }
  const [rows] = await db.query(query, params);
  return rows;
}

module.exports = { getChartData, getGroups, getVehicles, getDrivers };