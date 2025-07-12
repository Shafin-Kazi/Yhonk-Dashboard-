
const db = require('../db');
// Get all horn duration reports
async function getAllReports(filters = {}) {
  let query = `
    SELECT
      hdr.id,
      hdr.group_name,
      v.registration_number as vehicle,
      d.name as driver,
      hdr.imei,
      hdr.horn_type,
      hdr.horn_duration,
      hdr.horn_count,
      hdr.created_at
    FROM horn_duration_reports hdr
    LEFT JOIN vehicles v ON hdr.vehicle_id = v.id
    LEFT JOIN drivers d ON hdr.driver_id = d.id
  `;
  const params = [];
  const whereClauses = [];

  if (filters.group) {
    whereClauses.push('hdr.group_name = ?');
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
    whereClauses.push('hdr.imei LIKE ?');
    params.push(`%${filters.imei}%`);
  }
  if (filters.from) {
    whereClauses.push('hdr.created_at >= ?');
    params.push(filters.from);
  }
  if (filters.to) {
    whereClauses.push('hdr.created_at <= ?');
    params.push(filters.to);
  }
  if (filters.hornType) {
    whereClauses.push('hdr.horn_type = ?');
    params.push(filters.hornType);
  }
  if (filters.duration) {
    const [min, max] = filters.duration.replace('s', '').replace('+', '').split('–');
    whereClauses.push('hdr.horn_duration BETWEEN ? AND ?');
    params.push(min);
    params.push(max || 9999);
  }


  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  if (filters.sortBy) {
    const sortableColumns = ['group_name', 'vehicle', 'driver', 'imei', 'horn_type', 'horn_duration', 'horn_count', 'created_at'];
    if (filters.sortBy && sortableColumns.includes(filters.sortBy)) {
      query += ` ORDER BY ${filters.sortBy} ${filters.sortDir === 'asc' ? 'ASC' : 'DESC'}`;
    }
  }

  const [rows] = await db.query(query, params);
  return rows;
}

// Add a new horn duration report
async function addReport(report) {
  const { group_name, vehicle_id, driver_id, imei, horn_type, horn_duration, horn_count } = report;
  const [result] = await db.query(
    'INSERT INTO horn_duration_reports (group_name, vehicle_id, driver_id, imei, horn_type, horn_duration, horn_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [group_name, vehicle_id, driver_id, imei, horn_type, horn_duration, horn_count]
  );
  return result.insertId;
}

// Get a single horn duration report by ID
async function getReportById(id) {
  const [rows] = await db.query('SELECT * FROM horn_duration_reports WHERE id = ?', [id]);
  return rows[0];
}

// Update a horn duration report
async function updateReport(id, report) {
  const { group_name, vehicle_id, driver_id, imei, horn_type, horn_duration, horn_count } = report;
  await db.query(
    'UPDATE horn_duration_reports SET group_name=?, vehicle_id=?, driver_id=?, imei=?, horn_type=?, horn_duration=?, horn_count=? WHERE id=?',
    [group_name, vehicle_id, driver_id, imei, horn_type, horn_duration, horn_count, id]
  );
}

// Delete a horn duration report
async function deleteReport(id) {
  await db.query('DELETE FROM horn_duration_reports WHERE id = ?', [id]);
}

module.exports = {
  getAllReports,
  addReport,
  getReportById,
  updateReport,
  deleteReport
};
