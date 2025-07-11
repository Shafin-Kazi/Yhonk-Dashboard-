import React, { useState } from "react";
import CreateSilentZoneForm from "./CreateSilentZoneForm";
import "./SilentZones.css";

const categories = ["Hospital", "School", "Residential", "Custom"];
const statuses = ["Active", "Inactive"];

const initialZones = [
  {
    name: "City Hospital",
    category: "Hospital",
    latitude: "19.0760",
    longitude: "72.8777",
    radius: 200,
    status: "Active",
  },
  {
    name: "Greenfield School",
    category: "School",
    latitude: "19.0800",
    longitude: "72.8800",
    radius: 150,
    status: "Inactive",
  },
];

export default function SilentZones() {
  const [search, setSearch] = useState({ name: "", category: "", status: "" });
  const [zones, setZones] = useState(initialZones);
  const [showForm, setShowForm] = useState(false);

  // Filtering logic
  const filtered = zones.filter(
    (z) =>
      (!search.name || z.name.toLowerCase().includes(search.name.toLowerCase())) &&
      (!search.category || z.category === search.category) &&
      (!search.status || z.status === search.status)
  );

  const handleCreate = (zone) => {
    setZones((prev) => [...prev, zone]);
    setShowForm(false);
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
          onClick={() => {}}
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
            {filtered.map((z, i) => (
              <tr key={i}>
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