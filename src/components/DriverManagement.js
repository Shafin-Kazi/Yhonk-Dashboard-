import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, X, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import './DriverManagement.css';

const DriverManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-06-15',
      email: 'john.doe@email.com',
      preferredLanguage: 'English',
      phoneNumber: '+91 98765 43210',
      experience: 8,
      age: 38,
      gender: 'Male',
      occupation: 'Professional Driver',
      driverRating: 4.5,
      rightEarAudiogram: 25,
      leftEarAudiogram: 30,
      signalToNoise: 15,
      personalHearingIntelligence: 'Good',
      education: 'High School',
      income: '50000-75000',
      disability: 'None',
      maritalStatus: 'Married',
      aadharNumber: '1234-5678-9012',
      licenseNumber: 'DL-0120140149649',
      licenseType: 'Heavy Vehicle',
      dateOfLicenseIssue: '2015-03-20',
      country: 'India',
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '400001'
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    preferredLanguage: '',
    phoneNumber: '',
    experience: '',
    gender: '',
    occupation: '',
    driverRating: '',
    rightEarAudiogram: '',
    leftEarAudiogram: '',
    signalToNoise: '',
    personalHearingIntelligence: '',
    education: '',
    income: '',
    disability: '',
    maritalStatus: '',
    aadharNumber: '',
    licenseNumber: '',
    licenseType: '',
    dateOfLicenseIssue: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];
  const genders = ['Male', 'Female', 'Other'];
  const occupations = ['Professional Driver', 'Private Driver', 'Commercial Driver', 'Transport Driver', 'Delivery Driver'];
  const hearingIntelligence = ['Excellent', 'Good', 'Fair', 'Poor'];
  const educationLevels = ['Primary', 'High School', 'Diploma', 'Bachelor\'s', 'Master\'s', 'PhD'];
  const incomeRanges = ['Below 25000', '25000-50000', '50000-75000', '75000-100000', 'Above 100000'];
  const disabilities = ['None', 'Visual', 'Hearing', 'Mobility', 'Other'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const licenseTypes = ['Learner\'s License', 'Light Motor Vehicle', 'Heavy Vehicle', 'Commercial Vehicle', 'Motorcycle'];
  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'West Bengal', 'Uttar Pradesh'];

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    return differenceInYears(new Date(), new Date(dateOfBirth));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate age when date of birth changes
    if (name === 'dateOfBirth') {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        age: age
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDriver = {
      id: Date.now(),
      ...formData,
      age: calculateAge(formData.dateOfBirth)
    };
    setDrivers(prev => [...prev, newDriver]);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      preferredLanguage: '',
      phoneNumber: '',
      experience: '',
      gender: '',
      occupation: '',
      driverRating: '',
      rightEarAudiogram: '',
      leftEarAudiogram: '',
      signalToNoise: '',
      personalHearingIntelligence: '',
      education: '',
      income: '',
      disability: '',
      maritalStatus: '',
      aadharNumber: '',
      licenseNumber: '',
      licenseType: '',
      dateOfLicenseIssue: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    });
    setShowForm(false);
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="driver-management">
      <div className="page-header">
        <div className="header-content">
          <h2 className="subtitle">Manage Drivers</h2>
          <p className="subtitle">Register and manage driver information</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add Driver
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-panel">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search drivers by name or license number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select className="form-select">
            <option value="">All Genders</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          <select className="form-select">
            <option value="">All License Types</option>
            {licenseTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Driver Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal large">
            <div className="form-header">
              <h3>Add New Driver</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="driver-form">
              {/* Basic Information */}
              <div className="form-section">
                <h4 className="section-title">
                  <Users size={16} />
                  Basic Information
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-input"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Language *</label>
                    <select
                      name="preferredLanguage"
                      className="form-select"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-input"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Driver Details */}
              <div className="form-section">
                <h4 className="section-title">
                  <Users size={16} />
                  Driver Details
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Experience (Years) *</label>
                    <input
                      type="number"
                      name="experience"
                      className="form-input"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age (Auto-calculated)</label>
                    <input
                      type="number"
                      name="age"
                      className="form-input"
                      value={formData.age || ''}
                      readOnly
                      style={{ backgroundColor: '#f3f4f6' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Occupation *</label>
                    <select
                      name="occupation"
                      className="form-select"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Occupation</option>
                      {occupations.map(occupation => (
                        <option key={occupation} value={occupation}>{occupation}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Driver Rating</label>
                    <input
                      type="number"
                      name="driverRating"
                      className="form-input"
                      value={formData.driverRating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              {/* Hearing Assessment */}
              <div className="form-section">
                <h4 className="section-title">
                  <Users size={16} />
                  Hearing Assessment (Optional)
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Right Ear Audiogram (dB)</label>
                    <input
                      type="number"
                      name="rightEarAudiogram"
                      className="form-input"
                      value={formData.rightEarAudiogram}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Left Ear Audiogram (dB)</label>
                    <input
                      type="number"
                      name="leftEarAudiogram"
                      className="form-input"
                      value={formData.leftEarAudiogram}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Signal to Noise Ratio</label>
                    <input
                      type="number"
                      name="signalToNoise"
                      className="form-input"
                      value={formData.signalToNoise}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Personal Hearing Intelligence</label>
                    <select
                      name="personalHearingIntelligence"
                      className="form-select"
                      value={formData.personalHearingIntelligence}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Level</option>
                      {hearingIntelligence.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="form-section">
                <h4 className="section-title">
                  <Users size={16} />
                  Additional Information
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Education</label>
                    <select
                      name="education"
                      className="form-select"
                      value={formData.education}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Education</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Income Range</label>
                    <select
                      name="income"
                      className="form-select"
                      value={formData.income}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Income Range</option>
                      {incomeRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Disability</label>
                    <select
                      name="disability"
                      className="form-select"
                      value={formData.disability}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Disability</option>
                      {disabilities.map(disability => (
                        <option key={disability} value={disability}>{disability}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Marital Status</label>
                    <select
                      name="maritalStatus"
                      className="form-select"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Status</option>
                      {maritalStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Identification */}
              <div className="form-section">
                <h4 className="section-title">
                  <Users size={16} />
                  Identification
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Aadhar Number *</label>
                    <input
                      type="text"
                      name="aadharNumber"
                      className="form-input"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">License Number *</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      className="form-input"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">License Type *</label>
                    <select
                      name="licenseType"
                      className="form-select"
                      value={formData.licenseType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select License Type</option>
                      {licenseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of License Issue *</label>
                    <input
                      type="date"
                      name="dateOfLicenseIssue"
                      className="form-input"
                      value={formData.dateOfLicenseIssue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="form-section">
                <h4 className="section-title">
                  <MapPin size={16} />
                  Location
                </h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Country *</label>
                    <select
                      name="country"
                      className="form-select"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select
                      name="state"
                      className="form-select"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-input"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drivers Table */}
      <div className="drivers-table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Contact</th>
              <th>License</th>
              <th>Experience</th>
              <th>Rating</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map(driver => (
              <tr key={driver.id}>
                <td>
                  <div className="driver-info">
                    <div className="driver-name">{driver.firstName} {driver.lastName}</div>
                    <div className="driver-age">{driver.age} years, {driver.gender}</div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={12} />
                      <span>{driver.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={12} />
                      <span>{driver.phoneNumber}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="license-info">
                    <div className="license-number">{driver.licenseNumber}</div>
                    <div className="license-type">{driver.licenseType}</div>
                  </div>
                </td>
                <td>{driver.experience} years</td>
                <td>
                  <div className="rating">
                    <span className="rating-value">{driver.driverRating}</span>
                    <span className="rating-stars">★★★★☆</span>
                  </div>
                </td>
                <td>
                  <div className="location-info">
                    <div>{driver.city}, {driver.state}</div>
                    <div className="pincode">{driver.pincode}</div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit">
                      <Edit size={14} />
                    </button>
                    <button className="action-btn delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverManagement; 