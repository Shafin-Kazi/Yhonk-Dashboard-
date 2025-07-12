const db = require('../db');

// Get all drivers
async function getAllDrivers() {
  const [rows] = await db.query('SELECT * FROM drivers');
  return rows;
}

// Add a new driver
async function addDriver(driver) {
  const {
    name, date_of_birth, email, preferred_language, phone, experience, gender,
    occupation, driver_rating, right_ear_audiogram, left_ear_audiogram,
    signal_to_noise, personal_hearing_intelligence, education, income,
    disability, marital_status, aadhar_number, license_number, license_type,
    date_of_license_issue, country, state, city, pincode, status
  } = driver;
  const [result] = await db.query(
    `INSERT INTO drivers (
      name, date_of_birth, email, preferred_language, phone, experience, gender,
      occupation, driver_rating, right_ear_audiogram, left_ear_audiogram,
      signal_to_noise, personal_hearing_intelligence, education, income,
      disability, marital_status, aadhar_number, license_number, license_type,
      date_of_license_issue, country, state, city, pincode, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name, date_of_birth, email, preferred_language, phone, experience, gender,
      occupation, driver_rating, right_ear_audiogram, left_ear_audiogram,
      signal_to_noise, personal_hearing_intelligence, education, income,
      disability, marital_status, aadhar_number, license_number, license_type,
      date_of_license_issue, country, state, city, pincode, status
    ]
  );
  return result.insertId;
}

// Get a single driver by ID
async function getDriverById(id) {
  const [rows] = await db.query('SELECT * FROM drivers WHERE id = ?', [id]);
  return rows[0];
}

// Update a driver
async function updateDriver(id, driver) {
  const {
    name, date_of_birth, email, preferred_language, phone, experience, gender,
    occupation, driver_rating, right_ear_audiogram, left_ear_audiogram,
    signal_to_noise, personal_hearing_intelligence, education, income,
    disability, marital_status, aadhar_number, license_number, license_type,
    date_of_license_issue, country, state, city, pincode, status
  } = driver;
  await db.query(
    `UPDATE drivers SET
      name=?, date_of_birth=?, email=?, preferred_language=?, phone=?, experience=?, gender=?,
      occupation=?, driver_rating=?, right_ear_audiogram=?, left_ear_audiogram=?,
      signal_to_noise=?, personal_hearing_intelligence=?, education=?, income=?,
      disability=?, marital_status=?, aadhar_number=?, license_number=?, license_type=?,
      date_of_license_issue=?, country=?, state=?, city=?, pincode=?, status=?
    WHERE id=?`,
    [
      name, date_of_birth, email, preferred_language, phone, experience, gender,
      occupation, driver_rating, right_ear_audiogram, left_ear_audiogram,
      signal_to_noise, personal_hearing_intelligence, education, income,
      disability, marital_status, aadhar_number, license_number, license_type,
      date_of_license_issue, country, state, city, pincode, status, id
    ]
  );
}

// Delete a driver
async function deleteDriver(id) {
  await db.query('DELETE FROM drivers WHERE id = ?', [id]);
}

module.exports = {
  getAllDrivers,
  addDriver,
  getDriverById,
  updateDriver,
  deleteDriver
};
