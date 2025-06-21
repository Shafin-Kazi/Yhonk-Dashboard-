import React, { useState } from 'react';
import { Smartphone, Plus, Search, Edit, Trash2, X, Activity, Signal, Wifi } from 'lucide-react';
import './DeviceManagement.css';

const DeviceManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState([
    {
      id: 1,
      imeiNumber: '123456789012345',
      simNumber: '+91 98765 43210',
      yhonkSerialNumber: 'YHNK-2024-001',
      description: 'GPS Tracking Device for Vehicle Fleet',
      status: 'Active',
      lastSeen: '2024-01-15 14:30:00',
      batteryLevel: 85,
      signalStrength: 'Strong'
    }
  ]);

  const [deviceLogs, setDeviceLogs] = useState([
    {
      id: 1,
      deviceId: 1,
      timestamp: '2024-01-15 14:30:00',
      event: 'Location Update',
      details: 'Lat: 19.0760, Long: 72.8777',
      status: 'Success'
    },
    {
      id: 2,
      deviceId: 1,
      timestamp: '2024-01-15 14:25:00',
      event: 'Battery Check',
      details: 'Battery Level: 85%',
      status: 'Success'
    },
    {
      id: 3,
      deviceId: 1,
      timestamp: '2024-01-15 14:20:00',
      event: 'Signal Test',
      details: 'Signal Strength: Strong',
      status: 'Success'
    }
  ]);

  const [formData, setFormData] = useState({
    imeiNumber: '',
    simNumber: '',
    yhonkSerialNumber: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      id: Date.now(),
      ...formData,
      status: 'Active',
      lastSeen: new Date().toISOString().slice(0, 19).replace('T', ' '),
      batteryLevel: 100,
      signalStrength: 'Strong'
    };
    setDevices(prev => [...prev, newDevice]);
    setFormData({
      imeiNumber: '',
      simNumber: '',
      yhonkSerialNumber: '',
      description: ''
    });
    setShowForm(false);
  };

  const filteredDevices = devices.filter(device =>
    device.imeiNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.yhonkSerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'Inactive': return 'badge-warning';
      case 'Error': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return '#059669';
    if (level > 30) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="device-management">
      <div className="page-header">
        <div className="header-content">
          <h2>Manage Devices</h2>
          <p>Register and manage Yhonk devices</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={16} />
          Add Device
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-panel">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search devices by IMEI, serial number, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select className="form-select">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Error">Error</option>
          </select>
          <select className="form-select">
            <option value="">All Signal Strength</option>
            <option value="Strong">Strong</option>
            <option value="Medium">Medium</option>
            <option value="Weak">Weak</option>
          </select>
        </div>
      </div>

      {/* Device Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>Add New Device</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="device-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">IMEI Number *</label>
                  <input
                    type="text"
                    name="imeiNumber"
                    className="form-input"
                    value={formData.imeiNumber}
                    onChange={handleInputChange}
                    placeholder="15-digit IMEI number"
                    pattern="[0-9]{15}"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">SIM Number *</label>
                  <input
                    type="tel"
                    name="simNumber"
                    className="form-input"
                    value={formData.simNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Yhonk Serial Number *</label>
                  <input
                    type="text"
                    name="yhonkSerialNumber"
                    className="form-input"
                    value={formData.yhonkSerialNumber}
                    onChange={handleInputChange}
                    placeholder="YHNK-YYYY-XXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    className="form-input"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Device description and purpose..."
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Devices Table */}
      <div className="devices-table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Device</th>
              <th>IMEI</th>
              <th>SIM</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Signal</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map(device => (
              <tr key={device.id}>
                <td>
                  <div className="device-info">
                    <div className="device-serial">
                      <Smartphone size={16} />
                      <span>{device.yhonkSerialNumber}</span>
                    </div>
                    <div className="device-description">{device.description}</div>
                  </div>
                </td>
                <td>
                  <div className="imei-number">{device.imeiNumber}</div>
                </td>
                <td>
                  <div className="sim-number">{device.simNumber}</div>
                </td>
                <td>
                  <span className={`badge ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                </td>
                <td>
                  <div className="battery-indicator">
                    <div className="battery-bar">
                      <div 
                        className="battery-level" 
                        style={{ 
                          width: `${device.batteryLevel}%`,
                          backgroundColor: getBatteryColor(device.batteryLevel)
                        }}
                      ></div>
                    </div>
                    <span className="battery-text">{device.batteryLevel}%</span>
                  </div>
                </td>
                <td>
                  <div className="signal-indicator">
                    <Signal size={14} />
                    <span>{device.signalStrength}</span>
                  </div>
                </td>
                <td>
                  <div className="last-seen">
                    <div className="timestamp">{device.lastSeen}</div>
                  </div>
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

      {/* Device Log Table */}
      <div className="device-logs-section">
        <div className="section-header">
          <h3>Device Logs</h3>
          <div className="log-filters">
            <select className="form-select">
              <option value="">All Events</option>
              <option value="Location Update">Location Update</option>
              <option value="Battery Check">Battery Check</option>
              <option value="Signal Test">Signal Test</option>
            </select>
            <select className="form-select">
              <option value="">All Status</option>
              <option value="Success">Success</option>
              <option value="Error">Error</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
        </div>
        
        <div className="device-logs-container">
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Device</th>
                <th>Event</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deviceLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <div className="log-timestamp">
                      <Activity size={12} />
                      <span>{log.timestamp}</span>
                    </div>
                  </td>
                  <td>
                    <div className="log-device">
                      <Smartphone size={12} />
                      <span>YHNK-2024-001</span>
                    </div>
                  </td>
                  <td>
                    <div className="log-event">{log.event}</div>
                  </td>
                  <td>
                    <div className="log-details">{log.details}</div>
                  </td>
                  <td>
                    <span className={`badge ${log.status === 'Success' ? 'badge-success' : 'badge-danger'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagement; 