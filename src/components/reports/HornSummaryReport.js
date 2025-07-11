import { useState } from "react";
import { Download, Search, RefreshCw } from "lucide-react";
import './HornSummaryReport.css';

const groups = ["Group A", "Group B"];
const vehicles = { "Group A": ["Vehicle 1", "Vehicle 2"], "Group B": ["Vehicle 3"] };
const drivers = { "Vehicle 1": ["D001", "D002"], "Vehicle 2": ["D003"], "Vehicle 3": ["D004"] };

const mockData = [
  {
    id: 1,
    group: "Uber Ahmedabad",
    date: "10/04/2025",
    vehicle: "GJ-01-DZ-7191",
    driver: "MARA-8143",
    yhonkSerial: "APUB-0123",
    imei: "868404048102722",
    normal: 0,
    long: 0,
    multiple: 8,
    total: 8,
  },
  {
    id: 2,
    group: "Uber Ahmedabad",
    date: "09/04/2025",
    vehicle: "GJ-01-DZ-7191",
    driver: "MARA-8143",
    yhonkSerial: "APUB-0123",
    imei: "868404048102722",
    normal: 1,
    long: 0,
    multiple: 0,
    total: 1,
  },
  {
    id: 3,
    group: "Uber Ahmedabad",
    date: "06/04/2025",
    vehicle: "GJ-01-ET-4136",
    driver: "KASO-9890",
    yhonkSerial: "APUB-0128",
    imei: "868404048077791",
    normal: 33,
    long: 5,
    multiple: 10,
    total: 48,
  },
  {
    id: 4,
    group: "Uber Ahmedabad",
    date: "04/04/2025",
    vehicle: "GJ-01-DZ-7191",
    driver: "MARA-8143",
    yhonkSerial: "APUB-0123",
    imei: "868404048102722",
    normal: 1,
    long: 0,
    multiple: 0,
    total: 1,
  },
  {
    id: 5,
    group: "Uber Ahmedabad",
    date: "31/03/2025",
    vehicle: "GJ-01-DZ-7191",
    driver: "MARA-8143",
    yhonkSerial: "APUB-0123",
    imei: "868404048102722",
    normal: 1,
    long: 0,
    multiple: 0,
    total: 1,
  },
  {
    id: 6,
    group: "Uber Ahmedabad",
    date: "30/03/2025",
    vehicle: "GJ-01-ET-4136",
    driver: "KASO-9890",
    yhonkSerial: "APUB-0128",
    imei: "868404048077791",
    normal: 24,
    long: 42,
    multiple: 10,
    total: 76,
  },
];

export default function HornSummaryReport() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [imei, setImei] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDownload, setShowDownload] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  return (
    <div className="report-container">
      <h2 className="summary-title">Horn Summary Report</h2>
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
      <div className="summary-table-card">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Group</th>
              <th onClick={() => { setSortBy("date"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>Date {sortBy === "date" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th>Vehicle - Driver</th>
              <th>IMEI</th>
              <th onClick={() => { setSortBy("normal"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>Normal Horn Count {sortBy === "normal" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th onClick={() => { setSortBy("long"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>Long Count Total {sortBy === "long" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th onClick={() => { setSortBy("multiple"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>Multiple Count Total {sortBy === "multiple" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th onClick={() => { setSortBy("total"); setSortDir(sortDir === "asc" ? "desc" : "asc"); }} style={{cursor:'pointer'}}>Total Count {sortBy === "total" && (sortDir === "asc" ? "▲" : "▼")}</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={row.id} className={i % 2 === 1 ? 'alt-row' : ''}>
                <td>{row.group}</td>
                <td>{row.date}</td>
                <td>
                  <div>Vehicle : {row.vehicle}</div>
                  <div className="cell-sub">Serial Number : {row.driver}</div>
                </td>
                <td>
                  <div>{row.yhonkSerial}</div>
                  <div className="cell-sub">{row.imei}</div>
                </td>
                <td>{row.normal}</td>
                <td>{row.long}</td>
                <td>{row.multiple}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 