import { useState, useEffect } from "react";
import { Download, Search, RefreshCw } from "lucide-react";
import './HornSummaryReport.css';

const API_URL = 'http://localhost:5000/api/horn-summary-reports';


export default function HornSummaryReport() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [imei, setImei] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showDownload, setShowDownload] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchData = () => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (selectedGroup) queryParams.append('group', selectedGroup);
    if (selectedVehicle) queryParams.append('vehicle', selectedVehicle);
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
        setError('Failed to fetch summary reports');
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
    fetchData();
  }, [sortBy, sortDir]);

  const handleReset = () => {
    setSelectedGroup("");
    setSelectedVehicle("");
    setImei("");
    setDateRange({ from: "", to: "" });
  };

  return (
    <div className="report-container">
      <h2 className="summary-title">Horn Summary Report</h2>
      <div className="report-search-panel">
        <div>
          <label>Select Group</label>
          <select value={selectedGroup} onChange={e => { setSelectedGroup(e.target.value); setSelectedVehicle(""); }}>
            <option value="">All</option>
            {groups.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label>Select Vehicle</label>
          <select value={selectedVehicle} onChange={e => { setSelectedVehicle(e.target.value); }} disabled={!selectedGroup}>
            <option value="">All</option>
            {vehicles.map(v => <option key={v}>{v}</option>)}
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
        <button className="reset-btn" style={{marginTop: 24}} onClick={handleReset}>
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
        {loading ? (
          <div>Loading summary reports...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
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
              {data.map((row, i) => (
                <tr key={row.id} className={i % 2 === 1 ? 'alt-row' : ''}>
                  <td>{row.group_name}</td>
                  <td>{new Date(row.date).toLocaleDateString()}</td>
                  <td>
                    <div>Vehicle : {row.vehicle}</div>
                    <div className="cell-sub">Driver : {row.driver}</div>
                  </td>
                  <td>
                    <div>{row.yhonk_serial}</div>
                    <div className="cell-sub">{row.imei}</div>
                  </td>
                  <td>{row.normal}</td>
                  <td>{row.long_horn}</td>
                  <td>{row.multiple}</td>
                  <td>{row.total_horn_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
