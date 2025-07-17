import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { Car, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { differenceInYears } from 'date-fns';
import './VehicleManagement.css';

const API_URL = 'http://localhost:5000/api/vehicles';

const VehicleManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const [filterBrand, setFilterBrand] = useState('');
  const [filterType, setFilterType] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    registrationNumber: '',
    registrationDate: '',
    brand: '',
    model: '',
    vehicleType: '',
    ownership: '',
    hornDecibel: '',
    drivenBy: '',
    uses: '',
    age: ''
  });

  const [editId, setEditId] = useState(null);
  const [formMode, setFormMode] = useState('add');

  const brands = ['Toyota', 'Honda', 'Maruti Suzuki', 'Hyundai', 'Mahindra', 'Tata', 'Ford', 'BMW', 'Mercedes', 'Audi', 'TVS', 'Force Motors', 'Ashok Leyland', 'Volvo', 'Bharat Benz'];
  const brandVehicleTypeMap = {
    'MCWG (Motor Cycle with Gear)': {
      'Honda': ['CB Shine', 'SP 125', 'Unicorn', 'Hornet', 'Hness CB350', 'Other'],
      'BMW': ['G310R', 'G310GS', 'Other'],
      'Mahindra': ['Mojo', 'Other']
    },
    'MCWOG (Motor Cycle without Gear)': {
      'Honda': ['Activa (All Series)', 'Dio', 'Other'],
      'Mahindra': ['Gusto', 'Electric Scooters', 'Other'],
      'TVS': ['Jupiter', 'iQube', 'Other']
    },
    'LMV (Light Motor Vehicle)': {
      'Toyota': ['Camry', 'Corolla', 'Glanza', 'Other'],
      'Honda': ['City', 'Amaze', 'Elevate', 'Other'],
      'Maruti Suzuki': ['Swift', 'Baleno', 'Dzire', 'Celerio', 'Other'],
      'Hyundai': ['i20', 'Verna', 'Venue', 'Other'],
      'Mahindra': ['Thar', 'XUV300', 'Other'],
      'Tata': ['Punch', 'Altroz', 'Tiago', 'Other'],
      'Ford': ['Figo', 'Aspire', 'Other'],
      'BMW': ['3 Series', '5 Series', 'X1', 'Other'],
      'Mercedes': ['C-Class', 'A-Class', 'Other'],
      'Audi': ['A4', 'A3', 'Other'],
      'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'C40 Recharge', 'Other']
    },
    'LMV-NT (Light Motor Vehicle – Non-Transport)': {
      'Toyota': ['Camry', 'Corolla', 'Innova Crysta', 'Fortuner', 'Other'],
      'Honda': ['City', 'Civic', 'CR-V', 'Other'],
      'Maruti Suzuki': ['Swift', 'Brezza', 'Ertiga', 'Baleno', 'Other'],
      'Hyundai': ['Creta', 'Venue', 'Verna', 'Other'],
      'Mahindra': ['Scorpio', 'XUV500', 'Bolero', 'Other'],
      'Tata': ['Nexon', 'Harrier', 'Safari', 'Other'],
      'Ford': ['EcoSport', 'Endeavour', 'Other'],
      'BMW': ['X1', 'iX', '3 Series', 'Other'],
      'Mercedes': ['C-Class', 'E-Class', 'GLC', 'Other'],
      'Audi': ['A4', 'Q3', 'Q5', 'Other'],
      'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'C40 Recharge', 'Other']
    },
    'LMV-TR (Light Motor Vehicle – Transport)': {
      'Toyota': ['Innova Touring', 'Urban Cruiser Hyryder Taxi', 'Other'],
      'Honda': ['Amaze Tour', 'Other'],
      'Maruti Suzuki': ['Eeco Cargo', 'Tour H1', 'Tour M', 'Other'],
      'Hyundai': ['Aura CNG Taxi Variants', 'Other'],
      'Mahindra': ['Bolero Maxx', 'Jeeto', 'Supro', 'Other'],
      'Tata': ['Ace', 'Magic', 'Intra', 'Other']
    },
    'TRANS (Transport Vehicle)': {
      'Toyota': ['Hilux (Commercial + Lifestyle)', 'Other'],
      'Mahindra': ['Bolero Pik-Up', 'Furio Truck', 'Jeeto Plus', 'Other'],
      'Tata': ['Tata Yodha Pickup', 'Tata LPT 407', 'Tata 1512 Truck', 'Other'],
      'Force Motors': ['Traveller Minibus', 'Other']
    },
    'HMV (Heavy Motor Vehicle)': {
      'Tata': ['Tata Prima', 'Tata Signa (Trucks and Trailers)', 'Other'],
      'Mahindra': ['Blazo X Trucks', 'Furio Trucks', 'Other'],
      'Mercedes': ['Mercedes-Benz Actros', 'Other'],
      'Ashok Leyland': ['Dost','2518', 'Other'],
      'Volvo': ['Buses (All Series)','HCVs (Heavy Commercial Vehicals - All Series)', 'Other'],
      'Bharat Benz': ['Buses (All Series)','HCVs (Heavy Commercial Vehicals - All Series)', 'Other'],
    }
  };

  const vehicleTypes = ['MCWG (Motor Cycle with Gear)', 'MCWOG (Motor Cycle without Gear)', 'LMV (Light Motor Vehicle)', 'LMV-NT (Light Motor Vehicle – Non-Transport)', 'LMV-TR (Light Motor Vehicle – Transport)', 'TRANS (Transport Vehicle)', 'HMV (Heavy Motor Vehicle)'];
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

    if (name === 'registrationDate') {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        age: age
      }));
    }
  };

  //model filter according to the vehical brand and type
  const getFilteredModels = () => {
    if (!formData.brand || !formData.vehicleType) return [];

    const vehicleTypeData = brandVehicleTypeMap[formData.vehicleType];
    if (!vehicleTypeData) return [];

    const brandModels = vehicleTypeData[formData.brand];
    if (!brandModels) return [];

    return brandModels;
  };



  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(vehicle => ({
          id: vehicle.id,
          registrationNumber: vehicle.registration_number,
          registrationDate: vehicle.registration_date,
          brand: vehicle.brand,
          model: vehicle.model,
          vehicleType: vehicle.vehicle_type,
          ownership: vehicle.ownership,
          hornDecibel: vehicle.horn_decibel,
          drivenBy: vehicle.driven_by,
          uses: vehicle.uses,
          age: calculateAge(vehicle.registration_date)
        }));
        setVehicles(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch vehicles');
        setLoading(false);
      });
  }, []);

  // Add/Edit submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleData = {
      registration_number: formData.registrationNumber,
      registration_date: formData.registrationDate,
      brand: formData.brand,
      model: formData.model,
      vehicle_type: formData.vehicleType,
      ownership: formData.ownership,
      horn_decibel: formData.hornDecibel,
      driven_by: parseInt(formData.drivenBy, 10),
      uses: formData.uses
    };

    const resetForm = () => {
      setEditId(null);
      setFormMode('add');
      setFormData({
        registrationNumber: '', registrationDate: '', brand: '', model: '',
        vehicleType: '', ownership: '', hornDecibel: '', drivenBy: '',
        uses: '', age: ''
      });
      setShowForm(false);
    };

    if (formMode === 'edit') {
      fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
      })
        .then(res => res.json())
        .then(() => {
          // Create the updated vehicle object
          const updatedVehicle = {
            ...vehicles.find(v => v.id === editId), 
            ...formData, 
            age: calculateAge(formData.registrationDate)
          };
          // Update the state
          setVehicles(prev => prev.map(v => v.id === editId ? updatedVehicle : v));
          resetForm();
        })
        .catch(() => setError('Failed to update vehicle'));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
      })
        .then(res => res.json())
        .then(data => {
          setVehicles(prev => [
            ...prev,
            { id: data.id, ...formData, age: calculateAge(formData.registrationDate) }
          ]);
          resetForm();
        })
        .catch(() => setError('Failed to add vehicle'));
    }
  };

  const handleEdit = (vehicle) => {
    setFormMode('edit');
    setEditId(vehicle.id);
    setFormData({
      registrationNumber: vehicle.registrationNumber,
      registrationDate: vehicle.registrationDate,
      brand: vehicle.brand,
      model: vehicle.model,
      vehicleType: vehicle.vehicleType,
      ownership: vehicle.ownership,
      hornDecibel: vehicle.hornDecibel,
      drivenBy: vehicle.drivenBy,
      uses: vehicle.uses,
      age: vehicle.age
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchMatch =
      vehicle.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase());

    const brandMatch = filterBrand ? vehicle.brand === filterBrand : true;
    const typeMatch = filterType ? vehicle.vehicleType === filterType : true;

    return searchMatch && brandMatch && typeMatch;
  });

  useEffect(() => {
    if (searchParams.get("showForm") === "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <div className="vehicle-management">
      <div className="page-header">
        <div className="header-content">
          <h2 className="subtitle">Manage Vehicles</h2>
          <p className="subtitle">Register and manage vehicle information</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setFormMode('add'); setEditId(null); setShowForm(true); }}>
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
          <select
            className="form-select"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
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
              <h3>{formMode === 'edit' ? "Edit Vehicle" : "Add New Vehicle"}</h3>
              <button className="close-btn" onClick={() => { setShowForm(false); setEditId(null); setFormMode('add'); }}>
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
                  {/* changed a bit select function to get the filter according to the vehicle brand and types */}
                  <select
                    name="model"
                    value={formData.model}
                    className="form-select"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Model</option>
                    {getFilteredModels().map(model => (
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
                <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditId(null); setFormMode('add'); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {formMode === 'edit' ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="vehicles-table-container">
        {loading ? (
          <div>Loading vehicles...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
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
                      <button className="action-btn edit" onClick={() => handleEdit(vehicle)}>
                        <Edit size={14} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(vehicle.id)}>
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

export default VehicleManagement;
