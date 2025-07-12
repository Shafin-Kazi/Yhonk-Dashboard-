import React, { useState, useEffect } from "react";
import CreateSilentZoneForm from "./CreateSilentZoneForm";
import "./SilentZones.css";

const API_URL = 'http://localhost:5000/api/silent-zones';

const categories = ["Hospital", "School", "Residential", "Custom"];
const statuses = ["Active", "Inactive"];

export default function SilentZones() {
  const [search, setSearch] = useState({ name: "", category: "", status: "" });
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch silent zones from backend
  const fetchZones = () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (search.name) queryParams.append('name', search.name);
    if (search.category) queryParams.append('category', search.category);
    if (search.status) queryParams.append('status', search.status);

    fetch(`${API_URL}?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(z => ({
          id: z.id,
          name: z.name,
          category: z.category || "",
          latitude: z.latitude || "",
          longitude: z.longitude || "",
          radius: z.radius,
          status: z.active ? "Active" : "Inactive"
        }));
        setZones(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch silent zones');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchZones();
  }, []);

  // Add new silent zone to backend and update UI
  const handleCreate = (zone) => {
    const newZone = {
      name: zone.name,
      category: zone.category,
      latitude: zone.latitude,
      longitude: zone.longitude,
      radius: zone.radius,
      active: zone.status === "Active"
    };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newZone)
    })
      .then(res => res.json())
      .then(data => {
        setZones(prev => [
          ...prev,
          {
            id: data.id,
            ...zone
          }
        ]);
        setShowForm(false);
      })
      .catch(() => setError('Failed to add silent zone'));
  };

  return (
    <div className="silentzones-container">
      {/* Search Bar */}
      <div className="silentzones-searchbar">
        <div>
          <label>Name</label>
          <input
            value={search.name}
            onChange={e => setSearch(s => ({ ...s, name: e.target.value }))}
            placeholder="Search by name"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={search.category}
            onChange={e => setSearch(s => ({ ...s, category: e.target.value }))}
          >
            <option value="">All</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            value={search.status}
            onChange={e => setSearch(s => ({ ...s, status: e.target.value }))}
          >
            <option value="">All</option>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button
          className="search-btn"
          onClick={fetchZones}
        >
          Search
        </button>
        <button
          className="reset-btn"
          onClick={() => setSearch({ name: "", category: "", status: "" })}
        >
          Reset
        </button>
        <button
          className="create-btn"
          onClick={() => setShowForm(true)}
        >
          + Create Silent Zone
        </button>
      </div>

      {/* Table */}
      <div className="silentzones-table-container">
        {loading ? (
          <div>Loading silent zones...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <table className="silentzones-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Radius (m)</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.id || i}>
                  <td>{z.name}</td>
                  <td>{z.category}</td>
                  <td>{z.latitude}</td>
                  <td>{z.longitude}</td>
                  <td>{z.radius}</td>
                  <td>
                    <span className={`status-label ${z.status === 'Active' ? 'active' : 'inactive'}`}>
                      {z.status}
                    </span>
                  </td>
                  <td>{/* Action buttons (edit/delete) can go here */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Create Silent Zone */}
      {showForm && (
        <div className="silentzones-modal-overlay">
          <div className="silentzones-modal">
            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <CreateSilentZoneForm
              onCancel={() => setShowForm(false)}
              onSave={handleCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
}