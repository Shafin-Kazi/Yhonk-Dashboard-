import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { differenceInYears } from "date-fns";
import "./DriverManagement.css";

const API_URL = "http://localhost:5000/api/drivers";

const DriverManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [filterGender, setFilterGender] = useState("");
  const [filterLicenseType, setFilterLicenseType] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    preferredLanguage: "",
    phoneNumber: "",
    experience: "",
    gender: "",
    occupation: "",
    driverRating: "",
    rightEarAudiogram: "",
    leftEarAudiogram: "",
    signalToNoise: "",
    personalHearingIntelligence: "",
    education: "",
    income: "",
    disability: "",
    maritalStatus: "",
    aadharNumber: "",
    licenseNumber: "",
    licenseType: "",
    dateOfLicenseIssue: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    age: "",
  });

  const [editId, setEditId] = useState(null);

  const languages = [
    "English",
    "Hindi",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
  ];
  const genders = ["Male", "Female", "Other"];
  const occupations = [
    "State Transport Driver - Public Buses/Vehicles",
    "Police Department Driver - Police Vans/Jeeps",
    "Health Department Driver - Ambulances",
    "Government Offices Driver - Offical Cars",
    "Postal Department Driver - Mail Vans",
    "Private Department Driver - Private Vehicles",
    "Delivery Driver - Goods and Parcels Delivery",
    "Professional Drivers - Commercial Buses, Trucks",
    "Ride Share Drivers - Working for Ola, Uber, etc."
  ];
  const hearingIntelligence = ["Excellent", "Good", "Fair", "Poor"];
  const educationLevels = [
    "Primary",
    "High School",
    "Diploma",
    "Bachelor's",
    "Master's",
    "PhD",
  ];
  const incomeRanges = [
    "Below 25000",
    "25000-50000",
    "50000-75000",
    "75000-100000",
    "Above 100000",
  ];
  const disabilities = ["None", "Visual", "Hearing", "Mobility", "Other"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const licenseTypes = [
    "MCWOG (Motorcycle Without Gear)",
    "MCWG (Motorcycle With Gear)",
    "LMV (Light Motor Vehicle)",
    "LMV-NT (Light Motor Vehicle – Non-Transport)",
    "LMV-TR (Light Motor Vehicle – Transport)",
    "TRANS (Transport Vehicle License)",
    "HMV (Heavy Motor Vehicle)",
  ];
  const countries = ["India", "USA", "UK", "Canada", "Australia"];
  const states = [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "West Bengal",
    "Uttar Pradesh",
  ];

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    return differenceInYears(new Date(), new Date(dateOfBirth));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-calculate age when date of birth changes
    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData((prev) => ({
        ...prev,
        age: age,
      }));
    }
  };

  // Fetch drivers from backend
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Map backend fields to frontend fields if needed
        const mapped = data.map((driver) => ({
          id: driver.id,
          firstName: driver.name ? driver.name.split(" ")[0] : "",
          lastName: driver.name
            ? driver.name.split(" ").slice(1).join(" ")
            : "",
          dateOfBirth: driver.date_of_birth,
          email: driver.email,
          preferredLanguage: driver.preferred_language,
          phoneNumber: driver.phone,
          experience: driver.experience,
          age: calculateAge(driver.date_of_birth),
          gender: driver.gender,
          occupation: driver.occupation,
          driverRating: driver.driver_rating,
          rightEarAudiogram: driver.right_ear_audiogram,
          leftEarAudiogram: driver.left_ear_audiogram,
          signalToNoise: driver.signal_to_noise,
          personalHearingIntelligence: driver.personal_hearing_intelligence,
          education: driver.education,
          income: driver.income,
          disability: driver.disability,
          maritalStatus: driver.marital_status,
          aadharNumber: driver.aadhar_number,
          licenseNumber: driver.license_number,
          licenseType: driver.license_type,
          dateOfLicenseIssue: driver.date_of_license_issue,
          country: driver.country,
          state: driver.state,
          city: driver.city,
          pincode: driver.pincode,
        }));
        setDrivers(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch drivers");
        setLoading(false);
      });
  }, []);

  const handleEdit = (driver) => {
    setEditId(driver.id);
    setFormData({
      ...driver,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to delete driver");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDriver = {
      name: `${formData.firstName} ${formData.lastName}`,
      date_of_birth: formData.dateOfBirth,
      email: formData.email,
      preferred_language: formData.preferredLanguage,
      phone: formData.phoneNumber,
      experience: formData.experience,
      gender: formData.gender,
      occupation: formData.occupation,
      driver_rating: formData.driverRating,
      right_ear_audiogram: formData.rightEarAudiogram,
      left_ear_audiogram: formData.leftEarAudiogram,
      signal_to_noise: formData.signalToNoise,
      personal_hearing_intelligence: formData.personalHearingIntelligence,
      education: formData.education,
      income: formData.income,
      disability: formData.disability,
      marital_status: formData.maritalStatus,
      aadhar_number: formData.aadharNumber,
      license_number: formData.licenseNumber,
      license_type: formData.licenseType,
      date_of_license_issue: formData.dateOfLicenseIssue,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      status: "Active",
    };
    if (editId) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDriver),
      })
        .then((res) => res.json())
        .then((data) => {
          setDrivers((prev) =>
            prev.map((d) =>
              d.id === editId
                ? { ...d, ...formData, age: calculateAge(formData.dateOfBirth) }
                : d
            )
          );
          setEditId(null);
          setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            preferredLanguage: "",
            phoneNumber: "",
            experience: "",
            gender: "",
            occupation: "",
            driverRating: "",
            rightEarAudiogram: "",
            leftEarAudiogram: "",
            signalToNoise: "",
            personalHearingIntelligence: "",
            education: "",
            income: "",
            disability: "",
            maritalStatus: "",
            aadharNumber: "",
            licenseNumber: "",
            licenseType: "",
            dateOfLicenseIssue: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            age: "",
          });
          setShowForm(false);
        })
        .catch(() => setError("Failed to update driver"));
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDriver),
      })
        .then((res) => res.json())
        .then((data) => {
          setDrivers((prev) => [
            ...prev,
            {
              id: data.id,
              ...formData,
              age: calculateAge(formData.dateOfBirth),
            },
          ]);
          setFormData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            preferredLanguage: "",
            phoneNumber: "",
            experience: "",
            gender: "",
            occupation: "",
            driverRating: "",
            rightEarAudiogram: "",
            leftEarAudiogram: "",
            signalToNoise: "",
            personalHearingIntelligence: "",
            education: "",
            income: "",
            disability: "",
            maritalStatus: "",
            aadharNumber: "",
            licenseNumber: "",
            licenseType: "",
            dateOfLicenseIssue: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            age: "",
          });
          setShowForm(false);
        })
        .catch(() => setError("Failed to add driver"));
    }
  };

  const filteredDrivers = drivers.filter((driver) => {
    const fullName = `${driver.firstName || ""} ${
      driver.lastName || ""
    }`.toLowerCase();
    const searchMatch =
      fullName.includes(searchTerm.toLowerCase()) ||
      (driver.licenseNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const genderMatch = filterGender ? driver.gender === filterGender : true;
    const licenseTypeMatch = filterLicenseType
      ? driver.licenseType === filterLicenseType
      : true;

    return searchMatch && genderMatch && licenseTypeMatch;
  });

  // for directly opening the form when clicked on the button from quick action
  useEffect(() => {
    if (searchParams.get("showForm") === "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <div className="driver-management">
      <div className="page-header">
        <div className="header-content">
          <h2 className="subtitle">Manage Drivers</h2>
          <p className="subtitle">Register and manage driver information</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
        >
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
          <select
            className="form-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">All Genders</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            value={filterLicenseType}
            onChange={(e) => setFilterLicenseType(e.target.value)}
          >
            <option value="">All License Types</option>
            {licenseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Driver Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal large">
            <div className="form-header">
              <h3>{editId ? "Edit Driver" : "Add New Driver"}</h3>
              <button
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
              >
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
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
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
                      value={formData.age || ""}
                      readOnly
                      style={{ backgroundColor: "#f3f4f6" }}
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
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
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
                      {occupations.map((occupation) => (
                        <option key={occupation} value={occupation}>
                          {occupation}
                        </option>
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
                      {educationLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
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
                      {disabilities.map((disability) => (
                        <option key={disability} value={disability}>
                          {disability}
                        </option>
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
                      {licenseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Date of License Issue *
                    </label>
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
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
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
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editId ? "Update Driver" : "Add Driver"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drivers Table */}
      <div className="drivers-table-container">
        {loading ? (
          <div>Loading drivers...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
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
              {filteredDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td>
                    <div className="driver-info">
                      <div className="driver-name">
                        {driver.firstName} {driver.lastName}
                      </div>
                      <div className="driver-age">
                        {driver.age} years, {driver.gender}
                      </div>
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
                      <div className="license-number">
                        {driver.licenseNumber}
                      </div>
                      <div className="license-type">{driver.licenseType}</div>
                    </div>
                  </td>
                  <td>{driver.experience} years</td>
                  <td>
                    <div className="rating">
                      <span className="rating-value">
                        {driver.driverRating}
                      </span>
                      <span className="rating-stars">★★★★☆</span>
                    </div>
                  </td>
                  <td>
                    <div className="location-info">
                      <div>
                        {driver.city}, {driver.state}
                      </div>
                      <div className="pincode">{driver.pincode}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(driver)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(driver.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DriverManagement;
