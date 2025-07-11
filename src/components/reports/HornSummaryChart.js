import { useState } from "react";
import { Download, Search, RefreshCw } from "lucide-react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './HornSummaryChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const groups = ["Group A", "Group B"];
const vehicles = { "Group A": ["Vehicle 1", "Vehicle 2"], "Group B": ["Vehicle 3"] };
const drivers = { "Vehicle 1": ["D001", "D002"], "Vehicle 2": ["D003"], "Vehicle 3": ["D004"] };
const lines = ["Average Count", "Total Count"];

const daysInMonth = 31;
const labels = Array.from({ length: daysInMonth }, (_, i) => `${(i+1).toString().padStart(2, '0')}`);
const mockAvg = Array(daysInMonth).fill(0);
const mockTotal = Array(daysInMonth).fill(0);

const chartData = {
  labels: labels.map((d, i) => `${d} ${["Tue","Wed","Thu","Fri","Sat","Sun","Mon"][i%7]}`),
  datasets: [
    {
      type: 'line',
      label: 'Average Count',
      data: mockAvg,
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf8',
      tension: 0.2,
      pointRadius: 4,
      pointBackgroundColor: '#38bdf8',
      borderWidth: 3,
      fill: false,
    },
    {
      type: 'bar',
      label: 'Total Count',
      data: mockTotal,
      backgroundColor: '#22c55e',
      borderRadius: 4,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: { font: { size: 15 } }
    },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { color: '#f3f4f6' },
      ticks: { color: '#222', font: { size: 12 } },
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: { color: '#222', font: { size: 12 } },
      min: -1, max: 1, stepSize: 0.2,
    },
  },
};

export default function HornSummaryChart() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedLine, setSelectedLine] = useState("Average Count");
  const [month, setMonth] = useState({ label: "July 2025", value: 6 });

  return (
    <div className="report-container">
      <h2 className="chart-title">Chart</h2>
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
          <label>Select Driver</label>
          <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} disabled={!selectedVehicle}>
            <option value="">All</option>
            {(drivers[selectedVehicle] || []).map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label>Line</label>
          <select value={selectedLine} onChange={e => setSelectedLine(e.target.value)}>
            {lines.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <button className="reset-btn" style={{marginTop: 24}}>
          <RefreshCw size={16}/> Reset
        </button>
      </div>
      <div className="chart-card">
        <div className="chart-header">
          <button className="chart-nav-btn">&laquo;</button>
          <span className="chart-month">{month.label}</span>
          <button className="chart-nav-btn">&raquo;</button>
        </div>
        <Line data={chartData} options={chartOptions} height={340} />
      </div>
    </div>
  );
} 