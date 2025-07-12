const db = require('../db');

// Get all horn summary reports
async function getAllReports(filters = {}) {
  let query = `
    SELECT
      hsr.id,
      hsr.group_name,
      hsr.date,
      v.registration_number as vehicle,
      d.name as driver,
      hsr.yhonk_serial,
      hsr.imei,
      hsr.normal,
      hsr.long_horn,
      hsr.multiple,
      hsr.total_horn_time
    FROM horn_summary_reports hsr
    LEFT JOIN vehicles v ON hsr.vehicle_id = v.id
    LEFT JOIN drivers d ON hsr.driver_id = d.id
  `;
  const params = [];
  const whereClauses = [];

  if (filters.group) {
    whereClauses.push('hsr.group_name = ?');
    params.push(filters.group);
  }
  if (filters.vehicle) {
    whereClauses.push('v.registration_number = ?');
    params.push(filters.vehicle);
  }
  if (filters.driver) {
    whereClauses.push('d.id = ?');
    params.push(filters.driver);
  }
  if (filters.imei) {
    whereClauses.push('hsr.imei LIKE ?');
    params.push(`%${filters.imei}%`);
  }
  if (filters.from) {
    whereClauses.push('hsr.date >= ?');
    params.push(filters.from);
  }
  if (filters.to) {
    whereClauses.push('hsr.date <= ?');
    params.push(filters.to);
  }

  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  if (filters.sortBy) {
    query += ` ORDER BY ${db.escapeId(filters.sortBy)} ${filters.sortDir === 'asc' ? 'ASC' : 'DESC'}`;
  }

  const [rows] = await db.query(query, params);
  return rows;
}

// Add a new horn summary report
async function addReport(report) {
  const { group_name, date, vehicle_id, driver_id, yhonk_serial, imei, normal, long_horn, multiple, total_horn_time } = report;
  const [result] = await db.query(
    'INSERT INTO horn_summary_reports (group_name, date, vehicle_id, driver_id, yhonk_serial, imei, normal, long_horn, multiple, total_horn_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [group_name, date, vehicle_id, driver_id, yhonk_serial, imei, normal, long_horn, multiple, total_horn_time]
  );
  return result.insertId;
}

// Get a single horn summary report by ID
async function getReportById(id) {
  const [rows] = await db.query('SELECT * FROM horn_summary_reports WHERE id = ?', [id]);
  return rows[0];
}

// Update a horn summary report
async function updateReport(id, report) {
  const { group_name, date, vehicle_id, driver_id, yhonk_serial, imei, normal, long_horn, multiple, total_horn_time } = report;
  await db.query(
    'UPDATE horn_summary_reports SET group_name=?, date=?, vehicle_id=?, driver_id=?, yhonk_serial=?, imei=?, normal=?, long_horn=?, multiple=?, total_horn_time=? WHERE id=?',
    [group_name, date, vehicle_id, driver_id, yhonk_serial, imei, normal, long_horn, multiple, total_horn_time, id]
  );
}

// Delete a horn summary report
async function deleteReport(id) {
  await db.query('DELETE FROM horn_summary_reports WHERE id = ?', [id]);
}

module.exports = {
  getAllReports,
  addReport,
  getReportById,
  updateReport,
  deleteReport
};
