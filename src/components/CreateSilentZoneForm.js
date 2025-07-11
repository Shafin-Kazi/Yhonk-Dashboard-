import React, { useState } from "react";
import "./CreateSilentZoneForm.css";

const categories = ["Hospital", "School", "Residential", "Custom"];
const statuses = ["Active", "Inactive"];

export default function CreateSilentZoneForm({ onCancel, onSave }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    latitude: "",
    longitude: "",
    radius: "",
    status: "",
  });

  return (
    <form
      className="create-silentzone-form"
      onSubmit={e => {
        e.preventDefault();
        onSave(form);
      }}
    >
      <h2>Create Silent Zone</h2>
      <div>
        <label>Name *</label>
        <input
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div>
        <label>Category *</label>
        <select
          required
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">Select</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label>Latitude *</label>
        <input
          required
          value={form.latitude}
          onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))}
        />
      </div>
      <div>
        <label>Longitude *</label>
        <input
          required
          value={form.longitude}
          onChange={e => setForm(f => ({ ...f, longitude: e.target.value }))}
        />
      </div>
      <div>
        <label>Radius (meters) *</label>
        <input
          required
          value={form.radius}
          onChange={e => setForm(f => ({ ...f, radius: e.target.value }))}
        />
      </div>
      <div>
        <label>Status *</label>
        <select
          required
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">Select</option>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
} 