import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Smartphone,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Activity,
  Signal,
} from "lucide-react";
import "./DeviceManagement.css";
import DeviceInstallationChecklist from "./DeviceInstallationChecklist";

const API_URL = "http://localhost:5000/api/devices";

const DeviceManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deviceLogs, setDeviceLogs] = useState([]);
  const [logFilters, setLogFilters] = useState({ event: "", status: "" });
  const [deviceFilters, setDeviceFilters] = useState({
    status: "",
    signalStrength: "",
  });

  const [formData, setFormData] = useState({
    imeiNumber: "",
    simNumber: "",
    yhonkSerialNumber: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch devices and logs from backend
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(API_URL).then((res) => res.json()),
      fetch("http://localhost:5000/api/device-logs").then((res) => res.json()),
    ])
      .then(([devicesData, logsData]) => {
        const mappedDevices = devicesData.map((device) => ({
          id: device.id,
          imeiNumber: device.imei_number || "",
          simNumber: device.sim_number || "",
          yhonkSerialNumber: device.serial_number || "",
          description: device.description || "",
          status: device.status || "Active",
          lastSeen: device.last_seen || "",
          batteryLevel: device.battery_level || 100,
          signalStrength: device.signal_strength || "Strong",
        }));
        setDevices(mappedDevices);

        const mappedLogs = logsData.map((log) => ({
          id: log.id,
          deviceId: log.device_id,
          timestamp: new Date(log.created_at).toLocaleString(),
          event: log.event,
          details: log.details,
          status: log.status,
        }));
        setDeviceLogs(mappedLogs);

        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Edit handler
  const handleEdit = (device) => {
    setEditId(device.id);
    setFormData({
      imeiNumber: device.imeiNumber,
      simNumber: device.simNumber,
      yhonkSerialNumber: device.yhonkSerialNumber,
      description: device.description,
    });
    setShowForm(true);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to delete device");
    }
  };

  // Add/Edit submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      imei_number: formData.imeiNumber,
      sim_number: formData.simNumber,
      serial_number: formData.yhonkSerialNumber,
      description: formData.description,
      status: "Active",
      last_seen: new Date().toISOString().slice(0, 19).replace("T", " "),
      battery_level: 100,
      signal_strength: "Strong",
    };
    if (editId) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDevice),
      })
        .then((res) => res.json())
        .then((data) => {
          setDevices((prev) =>
            prev.map((d) =>
              d.id === editId
                ? {
                    ...d,
                    ...formData,
                    status: "Active",
                    lastSeen: newDevice.last_seen,
                    batteryLevel: 100,
                    signalStrength: "Strong",
                  }
                : d
            )
          );
          setEditId(null);
          setFormData({
            imeiNumber: "",
            simNumber: "",
            yhonkSerialNumber: "",
            description: "",
          });
          setShowForm(false);
        })
        .catch(() => setError("Failed to update device"));
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDevice),
      })
        .then((res) => res.json())
        .then((data) => {
          setDevices((prev) => [
            ...prev,
            {
              id: data.id,
              ...formData,
              status: "Active",
              lastSeen: newDevice.last_seen,
              batteryLevel: 100,
              signalStrength: "Strong",
            },
          ]);
          setFormData({
            imeiNumber: "",
            simNumber: "",
            yhonkSerialNumber: "",
            description: "",
          });
          setShowForm(false);
        })
        .catch(() => setError("Failed to add device"));
    }
  };

  const filteredDevices = devices.filter((device) => {
    const searchMatch =
      device.imeiNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.yhonkSerialNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      device.description.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = deviceFilters.status
      ? device.status === deviceFilters.status
      : true;
    const signalMatch = deviceFilters.signalStrength
      ? device.signalStrength === deviceFilters.signalStrength
      : true;

    return searchMatch && statusMatch && signalMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "badge-success";
      case "Inactive":
        return "badge-warning";
      case "Error":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return "#059669";
    if (level > 30) return "#d97706";
    return "#dc2626";
  };

  const fetchDeviceLogs = () => {
    const queryParams = new URLSearchParams();
    if (logFilters.event) queryParams.append("event", logFilters.event);
    if (logFilters.status) queryParams.append("status", logFilters.status);
    fetch(`http://localhost:5000/api/device-logs?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((logsData) => {
        const mappedLogs = logsData.map((log) => ({
          id: log.id,
          deviceId: log.device_id,
          timestamp: new Date(log.created_at).toLocaleString(),
          event: log.event,
          details: log.details,
          status: log.status,
        }));
        setDeviceLogs(mappedLogs);
      })
      .catch(() => setError("Failed to fetch device logs"));
  };

  useEffect(() => {
    fetchDeviceLogs();
  }, [logFilters]);

  useEffect(() => {
    if (searchParams.get("showForm") === "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <div className="device-management">
      <div className="page-header">
        <div className="header-content">
          <h2 className="subtitle">Manage Devices</h2>
          <p className="subtitle">Register and manage Yhonk devices</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
          }}
        >
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
        <div className="filter-options"></div>
      </div>

      {/* Device Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <div className="form-header">
              <h3>{editId ? "Edit Device" : "Add New Device"}</h3>
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
                  {editId ? "Update Device" : "Add Device"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Devices Table */}
      <div className="devices-table-container">
        {loading ? (
          <div>Loading devices...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Device</th>
                <th>IMEI</th>

                <th>Last Seen</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <div className="device-info">
                      <div className="device-serial">
                        <Smartphone size={16} />
                        <span>{device.yhonkSerialNumber}</span>
                      </div>
                      <div className="device-description">
                        {device.description}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="imei-number">{device.imeiNumber}</div>
                  </td>

                  <td></td>

                  <td></td>
                  <td>
                    <div className="last-seen">
                      <div className="timestamp">{device.lastSeen}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(device)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(device.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        className="btn btn-red"
                        onClick={() => {
                          setSelectedDevice(device);
                          setShowChecklist(true);
                        }}
                      >
                        Start Installation Checklist
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Device Log Table */}
      <div className="device-logs-section">
        <div className="section-header">
          <h3>Device Logs</h3>
          <div className="log-filters">
            <select
              className="form-select"
              value={logFilters.event}
              onChange={(e) =>
                setLogFilters((f) => ({ ...f, event: e.target.value }))
              }
            >
              <option value="">All Events</option>
              <option value="Device Online">Device Online</option>

              <option value="Device Offline">Device Offline</option>
              <option value="Firmware Update">Firmware Update</option>
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
              </tr>
            </thead>
            <tbody>
              {deviceLogs.map((log) => (
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
                      <span>
                        {
                          devices.find((d) => d.id === log.deviceId)
                            ?.yhonkSerialNumber
                        }
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="log-event">{log.event}</div>
                  </td>
                  <td>
                    <div className="log-details">{log.details}</div>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist Modal */}
      {showChecklist && (
        <div className="form-overlay">
          <div className="form-modal" style={{ maxWidth: 600 }}>
            <div className="form-header">
              <h3>Device Installation Checklist</h3>
              <button
                className="close-btn"
                onClick={() => setShowChecklist(false)}
              >
                <X size={20} />
              </button>
            </div>
            <DeviceInstallationChecklist
              device={selectedDevice}
              onClose={() => setShowChecklist(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceManagement;
