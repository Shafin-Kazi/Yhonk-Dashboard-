import { useState, useEffect } from "react";
import { Download, Search, RefreshCw, Eye, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import './HornDurationReport.css';

const API_URL = 'http://localhost:5000/api/horn-duration-reports';

const hornTypes = ["Normal", "Long", "Multiple"];
const durations = ["0–10s", "11–30s", "30+s"];

export default function HornDurationReport() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedHornType, setSelectedHornType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [imei, setImei] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDownload, setShowDownload] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Paging/sorting state (mocked)
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (selectedGroup) queryParams.append('group', selectedGroup);
    if (selectedVehicle) queryParams.append('vehicle', selectedVehicle);
    if (selectedDriver) queryParams.append('driver', selectedDriver);
    if (selectedHornType) queryParams.append('hornType', selectedHornType);
    if (selectedDuration) queryParams.append('duration', selectedDuration);
    if (imei) queryParams.append('imei', imei);
    if (dateRange.from) queryParams.append('from', dateRange.from);
    if (dateRange.to) queryParams.append('to', dateRange.to);
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (sortDir) queryParams.append('sortDir', sortDir);

    fetch(`${API_URL}?${queryParams.toString()}`)
      .then(res => res.json())
      .then(reports => {
        setData(reports);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch reports');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/horn-summary-chart/groups`)
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(() => setError('Failed to fetch groups'));
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetch(`http://localhost:5000/api/horn-summary-chart/vehicles?group=${selectedGroup}`)
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(() => setError('Failed to fetch vehicles'));
    } else {
      setVehicles([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedVehicle) {
      fetch(`http://localhost:5000/api/horn-summary-chart/drivers?vehicle=${selectedVehicle}`)
        .then(res => res.json())
        .then(data => setDrivers(data))
        .catch(() => setError('Failed to fetch drivers'));
    } else {
      setDrivers([]);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    fetchData();
  }, [sortBy, sortDir]);

  return (
    <div className="report-container">
      {/* Search Panel */}
      <div className="report-search-panel">
        <div>
          <label>Select Group</label>
          <select value={selectedGroup} onChange={e => { setSelectedGroup(e.target.value); setSelectedVehicle(""); setSelectedDriver(""); }}>
            <option value="">All</option>
            {groups.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => { setSelectedVehicle(e.target.value); setSelectedDriver(""); }} disabled={!selectedGroup}>
            <option value="">All</option>
            {vehicles.map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label>Select Driver Serial Number</label>
          <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} disabled={!selectedVehicle}>
            <option value="">All</option>
            {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label>Select Horn Type</label>
          <select value={selectedHornType} onChange={e => setSelectedHornType(e.target.value)}>
            <option value="">All</option>
            {hornTypes.map(h => <option key={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label>Horn Duration</label>
          <select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)}>
            <option value="">All</option>
            {durations.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label>Date Range</label>
          <div className="flex gap-2">
            <input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} />
            <span className="text-gray-500">to</span>
            <input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} />
          </div>
        </div>
        <div>
          <label>IMEI</label>
          <input value={imei} onChange={e => setImei(e.target.value)} placeholder="IMEI" />
        </div>
        <button className="search-btn" onClick={fetchData}>
          <Search size={16}/> Search
        </button>
        <button className="reset-btn" style={{marginTop: 24}}>
          <RefreshCw size={16}/> Reset
        </button>
      </div>
      {/* Table and Download Dropdown */}
      <div className="report-download-area">
        <div className="relative">
          <button className="report-download-btn" onClick={() => setShowDownload(v => !v)}>
            <Download size={16}/> Download
          </button>
          {showDownload && (
            <div className="download-dropdown">
              <div className="dropdown-item">Download CSV</div>
              <div className="dropdown-item">Download Excel</div>
            </div>
          )}
        </div>
      </div>
      <div className="horn-table-card">
        <table className="horn-table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Vehicle – Driver</th>
              <th>IMEI</th>
              <th>Horn Type</th>
              <th>Horn Duration (s)</th>
              <th>Horn Count</th>
              <th onClick={() => { setSortBy("created"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>
                Created Date {sortBy === "created" && (sortDir === "asc" ? "▲" : "▼")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.group_name}</td>
                <td><div>{row.vehicle}</div><div className="cell-sub">{row.driver}</div></td>
                <td><div>{row.imei}</div></td>
                <td><span className={`badge badge-${row.horn_type.toLowerCase()}`}>{row.horn_type}</span></td>
                <td>{row.horn_duration}</td>
                <td>{row.horn_count}</td>
                <td>{new Date(row.created_at).toLocaleString()}</td>
                <td>
                  <button className="action-btn" title="View Details" onClick={() => navigate(`/reports/horn-duration/${row.id}`)}><Eye size={18}/></button>
                  <button className="action-btn" title="Open Map"><MapPin size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paging UI (mocked) */}
        <div className="table-paging">
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p-1))}>{'<'}</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))}>{'>'}</button>
        </div>
      </div>
    </div>
  );
}
