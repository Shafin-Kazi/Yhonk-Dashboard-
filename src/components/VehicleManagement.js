import React, { useState } from 'react';
import { Car, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import './VehicleManagement.css';

const VehicleManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      registrationNumber: 'MH12AB1234',
      registrationDate: '2020-03-15',
      brand: 'Toyota',
      model: 'Camry',
      vehicleType: 'Sedan',
      ownership: 'Owned',
      age: 3,
      hornDecibel: 85,
      drivenBy: 'John Doe',
      uses: 'Personal'
    }
  ]);

  const [formData, setFormData] = useState({
    registrationNumber: '',
    registrationDate: '',
    brand: '',
    model: '',
    vehicleType: '',
    ownership: '',
    hornDecibel: '',
    drivenBy: '',
    uses: ''
  });

  const brands = ['Toyota', 'Honda', 'Maruti Suzuki', 'Hyundai', 'Mahindra', 'Tata', 'Ford', 'BMW', 'Mercedes', 'Audi'];
  const models = {
    'Toyota': ['Camry', 'Corolla', 'Innova', 'Fortuner'],
    'Honda': ['City', 'Civic', 'CR-V', 'Amaze'],
    'Maruti Suzuki': ['Swift', 'Dzire', 'Ertiga', 'Brezza'],
    'Hyundai': ['i20', 'Verna', 'Creta', 'Venue'],
    'Mahindra': ['XUV500', 'Scorpio', 'Thar', 'Bolero'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Punch'],
    'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire'],
    'BMW': ['3 Series', '5 Series', 'X1', 'X3'],
    'Mercedes': ['A-Class', 'C-Class', 'E-Class', 'GLA'],
    'Audi': ['A3', 'A4', 'Q3', 'Q5']
  };

  const vehicleTypes = ['Sedan', 'SUV', 'Hatchback', 'MUV', 'Truck', 'Bus', 'Motorcycle'];
  const ownershipTypes = ['Owned', 'Leased', 'Rented', 'Company'];
  const useTypes = ['Personal', 'Commercial', 'Transport', 'Delivery', 'Rental'];

  const calculateAge = (registrationDate) => {
    if (!registrationDate) return 0;
    return differenceInYears(new Date(), new Date(registrationDate));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate age when registration date changes
    if (name === 'registrationDate') {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        age: age
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: Date.now(),
      ...formData,
      age: calculateAge(formData.registrationDate)
    };
    setVehicles(prev => [...prev, newVehicle]);
    setFormData({
      registrationNumber: '',
      registrationDate: '',
      brand: '',
      model: '',
      vehicleType: '',
      ownership: '',
      hornDecibel: '',
      drivenBy: '',
      uses: ''
    });
    setShowForm(false);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vehicle-management">
      <div className="page-header">
        <div className="header-content">
          <h2>Manage Vehicles</h2>
          <p>Register and manage vehicle information</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add Vehicle
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-panel">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search vehicles by registration, brand, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select className="form-select">
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select className="form-select">
            <option value="">All Types</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicle Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Add New Vehicle</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="vehicle-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Registration Number *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    className="form-input"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Registration Date *</label>
                  <input
                    type="date"
                    name="registrationDate"
                    className="form-input"
                    value={formData.registrationDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brand Name *</label>
                  <select
                    name="brand"
                    className="form-select"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Model Name *</label>
                  <select
                    name="model"
                    className="form-select"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.brand}
                  >
                    <option value="">Select Model</option>
                    {formData.brand && models[formData.brand]?.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Vehicle Type *</label>
                  <select
                    name="vehicleType"
                    className="form-select"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ownership *</label>
                  <select
                    name="ownership"
                    className="form-select"
                    value={formData.ownership}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Ownership</option>
                    {ownershipTypes.map(ownership => (
                      <option key={ownership} value={ownership}>{ownership}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Age of Vehicle (Years)</label>
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
                  <label className="form-label">Horn Decibel *</label>
                  <input
                    type="number"
                    name="hornDecibel"
                    className="form-input"
                    value={formData.hornDecibel}
                    onChange={handleInputChange}
                    min="0"
                    max="150"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Driven By *</label>
                  <input
                    type="text"
                    name="drivenBy"
                    className="form-input"
                    value={formData.drivenBy}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Uses or Sub Uses *</label>
                  <select
                    name="uses"
                    className="form-select"
                    value={formData.uses}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Use</option>
                    {useTypes.map(use => (
                      <option key={use} value={use}>{use}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="vehicles-table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Age</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>
                  <div className="vehicle-registration">
                    <Car size={16} />
                    <span>{vehicle.registrationNumber}</span>
                  </div>
                </td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.age} years</td>
                <td>{vehicle.drivenBy}</td>
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

export default VehicleManagement; 