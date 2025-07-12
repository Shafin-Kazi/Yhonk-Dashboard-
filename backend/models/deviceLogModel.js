const db = require('../db');

// Get all device logs for a specific device
async function getLogsByDeviceId(deviceId, filters = {}) {
  let query = 'SELECT * FROM device_logs WHERE device_id = ?';
  const params = [deviceId];

  if (filters.event) {
    query += ' AND event = ?';
    params.push(filters.event);
  }
  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  query += ' ORDER BY created_at DESC';

  const [rows] = await db.query(query, params);
  return rows;
}

// Add a new device log
async function addLog(log) {
  const { device_id, event, details, status } = log;
  const [result] = await db.query(
    'INSERT INTO device_logs (device_id, event, details, status) VALUES (?, ?, ?, ?)',
    [device_id, event, details, status]
  );
  return result.insertId;
}

async function getAllLogs(filters = {}) {
  let query = 'SELECT * FROM device_logs';
  const params = [];
  const whereClauses = [];

  if (filters.event) {
    whereClauses.push('event = ?');
    params.push(filters.event);
  }
  if (filters.status) {
    whereClauses.push('status = ?');
    params.push(filters.status);
  }

  if (whereClauses.length > 0) {
    query += ' WHERE ' + whereClauses.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  const [rows] = await db.query(query, params);
  return rows;
}

module.exports = {
  getLogsByDeviceId,
  getAllLogs,
  addLog
};
