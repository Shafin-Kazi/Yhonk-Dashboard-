import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Car,
  Star,
  Edit3,
  Save,
  X,
  Globe,
  CreditCard,
  Award,
  Volume2,
} from "lucide-react";
import "./driver-dashboard.css";

const DriverDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  //CAUTION: This uses local storage. Here use any backend data base to store the info (This is done for just trial purpose)
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend database (FOR TRIAL PURPOSE IT USES LOCAL STORAGE WHICH IS NOT SAFE)
    localStorage.setItem("driverProfile", JSON.stringify(driverProfile));
    console.log("Saving profile:", driverProfile);
  };

  const [driverProfile, setDriverProfile] = useState(() => {
  const savedProfile = localStorage.getItem("driverProfile");
  return savedProfile ? JSON.parse(savedProfile) : {
    firstName: "Rajesh",
    lastName: "Kumar",
    dateOfBirth: "1985-06-15",
    email: "rajesh.kumar@email.com",
    preferredLanguage: "Hindi",
    phoneNumber: "+91 9876543210",
    driverExperience: "8",
    age: "38",
    gender: "Male",
    occupation: "Professional Driver",
    driverRating: "4.8",
    rightEarAudiogram: "Normal",
    leftEarAudiogram: "Normal",
    signalToNoise: "15 dB",
    personalHearingIntelligence: "Good",
    education: "High School",
    income: "₹25,000",
    disability: "None",
    maritalStatus: "Married",
    aadharNumber: "1234 5678 9012",
    drivingLicenseNumber: "MH12 20230001234",
    licenseType: "Commercial",
    dateOfLicenseIssue: "2015-03-20",
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    pincode: "400001",
  };
});

  const handleInputChange = (field, value) => {
    setDriverProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  //ocupation array
  const occupation = [
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

  const renderField = (
    label,
    field,
    type = "text",
    required = false,
    options,
    occupation
  ) => {
    const value = driverProfile[field];

    return (
      <div className="form-field">
        <label className="field-label">
          {label} {required && <span className="required">*</span>}
        </label>
        {isEditing ? (
          options ? (
            <select
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="field-input"
              required={required}
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="field-input"
              required={required}
            />
          )
        ) : (
          <div className="field-value">{value || "Not provided"}</div>
        )}
      </div>
    );
  };

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="driver-info">
            <div className="driver-avatar">
              <User size={32} />
            </div>
            <div>
              <h2>
                {driverProfile.firstName} {driverProfile.lastName}
              </h2>
              <p>
                {driverProfile.occupation} • {driverProfile.driverExperience} years experience
              </p>
              <div className="driver-rating">
                <Star size={16} fill="currentColor" />
                <span>{driverProfile.driverRating}</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            {!isEditing ? (
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn btn-success" onClick={handleSave}>
                  <Save size={16} />
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <Car size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Trips</h3>
            <div className="stat-value">1,247</div>
            <div className="stat-change">
              <span>+15 this week</span>
            </div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>Rating</h3>
            <div className="stat-value">{driverProfile.driverRating}</div>
            <div className="stat-change">
              <span>Excellent</span>
            </div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>Experience</h3>
            <div className="stat-value">{driverProfile.driverExperience}y</div>
            <div className="stat-change">
              <p>
                {driverProfile.occupation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={16} />
          Personal Information
        </button>
        <button
          className={`tab-button ${
            activeTab === "identification" ? "active" : ""
          }`}
          onClick={() => setActiveTab("identification")}
        >
          <CreditCard size={16} />
          Identification
        </button>
        <button
          className={`tab-button ${activeTab === "location" ? "active" : ""}`}
          onClick={() => setActiveTab("location")}
        >
          <MapPin size={16} />
          Location
        </button>
        <button
          className={`tab-button ${activeTab === "medical" ? "active" : ""}`}
          onClick={() => setActiveTab("medical")}
        >
          <Volume2 size={16} />
          Medical Information
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "profile" && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Information</h3>
              <p>Basic personal details and professional information</p>
            </div>
            <div className="form-grid">
              {renderField("First Name", "firstName", "text", true)}
              {renderField("Last Name", "lastName", "text", true)}
              {renderField("Date of Birth", "dateOfBirth", "date")}
              {renderField("Age", "age", "number", true)}
              {renderField("Email Address", "email", "email")}
              {renderField("Phone Number", "phoneNumber", "tel", true)}
              {renderField(
                "Preferred Language",
                "preferredLanguage",
                "text",
                true,
                [
                  "Hindi",
                  "English",
                  "Marathi",
                  "Tamil",
                  "Telugu",
                  "Bengali",
                  "Gujarati",
                ]
              )}
              {renderField("Gender", "gender", "text", true, [
                "Male",
                "Female",
                "Other",
              ])}
              {renderField("Occupation", "occupation", "text", true, occupation)}
              {renderField(
                "Driver Experience (Years)",
                "driverExperience",
                "number",
                true
              )}
              {renderField("Education", "education", "text")}
              {renderField("Income", "income", "text")}
              {renderField("Marital Status", "maritalStatus", "text", false, [
                "Single",
                "Married",
                "Divorced",
                "Widowed",
              ])}
              {renderField("Disability", "disability", "text")}
            </div>
          </div>
        )}

        {activeTab === "identification" && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Identification Information</h3>
              <p>Government issued identification and license details</p>
            </div>
            <div className="form-grid">
              {renderField("Aadhar Number", "aadharNumber", "text")}
              {renderField(
                "Driving License Number",
                "drivingLicenseNumber",
                "text",
                true
              )}
              {renderField("License Type", "licenseType", "text", true, [
                "MCWOG (Motorcycle Without Gear)",
                "MCWG (Motorcycle With Gear)",
                "LMV (Light Motor Vehicle)",
                "LMV-NT (Light Motor Vehicle – Non-Transport)",
                "LMV-TR (Light Motor Vehicle – Transport)",
                "TRANS (Transport Vehicle License)",
                "HMV (Heavy Motor Vehicle)",
              ])}
              {renderField(
                "Date of License Issue",
                "dateOfLicenseIssue",
                "date",
                true
              )}
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Location Information</h3>
              <p>Current address and location details</p>
            </div>
            <div className="form-grid">
              {renderField("Country", "country", "text", true, [
                "India",
                "USA",
                "UK",
                "Canada",
              ])}
              {renderField("State", "state", "text", true, [
                "Maharashtra",
                "Delhi",
                "Karnataka",
                "Tamil Nadu",
                "Gujarat",
                "Rajasthan",
              ])}
              {renderField("City", "city", "text", true)}
              {renderField("Pincode", "pincode", "text")}
            </div>
          </div>
        )}

        {activeTab === "medical" && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Medical Information</h3>
              <p>Health and hearing assessment details</p>
            </div>
            <div className="form-grid">
              {renderField("Driver Rating", "driverRating", "number")}
              {renderField("Right Ear Audiogram", "rightEarAudiogram", "text")}
              {renderField("Left Ear Audiogram", "leftEarAudiogram", "text")}
              {renderField("Signal To Noise", "signalToNoise", "text")}
              {renderField(
                "Personal Hearing Intelligence",
                "personalHearingIntelligence",
                "text"
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
