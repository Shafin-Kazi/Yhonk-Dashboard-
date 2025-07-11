import { useState } from "react";
import { Download, Search, RefreshCw, Eye, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import './HornDurationReport.css';

const groups = ["Group A", "Group B"];
const vehicles = { "Group A": ["Vehicle 1", "Vehicle 2"], "Group B": ["Vehicle 3"] };
const drivers = { "Vehicle 1": ["D001", "D002"], "Vehicle 2": ["D003"], "Vehicle 3": ["D004"] };
const hornTypes = ["Normal", "Long", "Multiple"];
const durations = ["0–10s", "11–30s", "30+s"];

const mockData = [
  {
    id: 1,
    group: "Group A",
    vehicle: "Vehicle 1",
    driver: "D001",
    imei: "123456789012345\nYHNK-2024-001",
    hornType: "Normal",
    hornDuration: 8,
    hornCount: 2,
    created: "2024-06-01 10:15:00",
  },
  {
    id: 2,
    group: "Group B",
    vehicle: "Vehicle 3",
    driver: "D004",
    imei: "987654321098765\nYHNK-2024-003",
    hornType: "Long",
    hornDuration: 32,
    hornCount: 1,
    created: "2024-06-02 14:22:00",
  },
];

export default function HornDurationReport() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedHornType, setSelectedHornType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [imei, setImei] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDownload, setShowDownload] = useState(false);

  // Paging/sorting state (mocked)
  const [page, setPage] = useState(1);
  const totalPages = 2;
  const [sortBy, setSortBy] = useState("created");
  const [sortDir, setSortDir] = useState("desc");

  const navigate = useNavigate();

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
            {(vehicles[selectedGroup] || []).map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label>Select Driver Serial Number</label>
          <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} disabled={!selectedVehicle}>
            <option value="">All</option>
            {(drivers[selectedVehicle] || []).map(d => <option key={d}>{d}</option>)}
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
        <button className="search-btn">
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
            {mockData.map(row => (
              <tr key={row.id}>
                <td>{row.group}</td>
                <td><div>{row.vehicle}</div><div className="cell-sub">{row.driver}</div></td>
                <td><div>{row.imei.split("\n")[0]}</div><div className="cell-sub">{row.imei.split("\n")[1]}</div></td>
                <td><span className={`badge badge-${row.hornType.toLowerCase()}`}>{row.hornType}</span></td>
                <td>{row.hornDuration}</td>
                <td>{row.hornCount}</td>
                <td>{row.created}</td>
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