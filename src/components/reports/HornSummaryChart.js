import { useState, useEffect } from "react";
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

const API_URL = 'http://localhost:5000/api/horn-summary-chart';

const lines = ["Average Count", "Total Count"];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function HornSummaryChart() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedLine, setSelectedLine] = useState("Average Count");
  const [month, setMonth] = useState(6); // July (0-based)
  const [year, setYear] = useState(2025);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const daysInMonth = getDaysInMonth(year, month);

  useEffect(() => {
    fetch(`${API_URL}/groups`)
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(() => setError('Failed to fetch groups'));
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetch(`${API_URL}/vehicles?group=${selectedGroup}`)
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(() => setError('Failed to fetch vehicles'));
    } else {
      setVehicles([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedVehicle) {
      fetch(`${API_URL}/drivers?vehicle=${selectedVehicle}`)
        .then(res => res.json())
        .then(data => setDrivers(data))
        .catch(() => setError('Failed to fetch drivers'));
    } else {
      setDrivers([]);
    }
  }, [selectedVehicle]);

  // Fetch chart data from backend
  useEffect(() => {
    setLoading(true);
    const from = `${year}-${(month + 1).toString().padStart(2, '0')}-01`;
    const to = `${year}-${(month + 1).toString().padStart(2, '0')}-${daysInMonth}`;
    const queryParams = new URLSearchParams({ from, to });
    if (selectedGroup) queryParams.append('group', selectedGroup);
    if (selectedVehicle) queryParams.append('vehicle', selectedVehicle);
    if (selectedDriver) queryParams.append('driver', selectedDriver);
    fetch(`${API_URL}?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        const labelArr = [];
        const avgArr = [];
        const totalArr = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
          const found = data.find(d => new Date(d.date).toISOString().slice(0, 10) === dateStr);
          labelArr.push(`${i.toString().padStart(2, '0')} ${["Tue","Wed","Thu","Fri","Sat","Sun","Mon"][i%7]}`);
          avgArr.push(found ? (found.horn_count / found.vehicle_count) : 0);
          totalArr.push(found ? found.horn_count : 0);
        }
        const allDatasets = [
          {
            type: 'line',
            label: 'Average Count',
            data: avgArr,
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
            data: totalArr,
            backgroundColor: '#22c55e',
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ];

        setChartData({
          labels: labelArr,
          datasets: allDatasets.filter(ds => ds.label === selectedLine),
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch chart data');
        setLoading(false);
      });
  }, [month, year, selectedGroup, selectedVehicle, selectedDriver, daysInMonth, selectedLine]);

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
        min: 0,
      },
    },
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const handleReset = () => {
    setSelectedGroup("");
    setSelectedVehicle("");
    setSelectedDriver("");
    setSelectedLine("Average Count");
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  };

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
            {vehicles.map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label>Select Driver</label>
          <select value={selectedDriver} onChange={e => setSelectedDriver(e.target.value)} disabled={!selectedVehicle}>
            <option value="">All</option>
            {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label>Line</label>
          <select value={selectedLine} onChange={e => setSelectedLine(e.target.value)}>
            {lines.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
        <button className="reset-btn" style={{marginTop: 24}} onClick={handleReset}>
          <RefreshCw size={16}/> Reset
        </button>
      </div>
      <div className="chart-card">
        <div className="chart-header">
          <button className="chart-nav-btn" onClick={handlePrevMonth}>&laquo;</button>
          <span className="chart-month">{monthNames[month]} {year}</span>
          <button className="chart-nav-btn" onClick={handleNextMonth}>&raquo;</button>
        </div>
        {loading ? (
          <div>Loading chart...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : chartData ? (
          <Line data={chartData} options={chartOptions} height={340} />
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
}