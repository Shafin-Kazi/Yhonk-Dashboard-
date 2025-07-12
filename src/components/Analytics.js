import React, { useState, useEffect } from 'react';
import './Analytics.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Analytics() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [driversInfo, setDriversInfo] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newThisMonth: 0,
  });
  const [devicesInfo, setDevicesInfo] = useState({
    activeDevices: 0,
    totalDevices: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const heatmapRes = await fetch('http://localhost:5000/api/analytics/vehicles-heatmap');
        const heatmap = await heatmapRes.json();
        setHeatmapData(heatmap.heatmap);

        const driversRes = await fetch('http://localhost:5000/api/analytics/drivers-info');
        const drivers = await driversRes.json();
        setDriversInfo(drivers);

        const devicesRes = await fetch('http://localhost:5000/api/analytics/devices-info');
        const devices = await devicesRes.json();
        setDevicesInfo(devices);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Analytics Dashboard</h2>
      <div className="analytics-grid">
        {/* Heatmap Card */}
        <div className="analytics-card heatmap-card">
          <h3>Vehicles Registered (Heatmap)</h3>
          <div className="heatmap-grid">
            <div className="heatmap-days">
              {days.map(day => (
                <div key={day} className="heatmap-day-label">{day}</div>
              ))}
            </div>
            {heatmapData.map((row, i) => (
              <div className="heatmap-row" key={i}>
                {row.map((val, j) => (
                  <div
                    key={j}
                    className="heatmap-cell"
                    style={{ background: `rgba(225,29,72,${0.12 + val * 0.15})` }}
                  >
                    {val > 0 ? val : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Drivers Info Card */}
        <div className="analytics-card drivers-card">
          <h3>Drivers Info</h3>
          <ul className="drivers-list">
            <li><b>Total Drivers:</b> {driversInfo.total}</li>
            <li><b>Active:</b> {driversInfo.active}</li>
            <li><b>Inactive:</b> {driversInfo.inactive}</li>
            <li><b>New This Month:</b> {driversInfo.newThisMonth}</li>
          </ul>
        </div>
        {/* Active Devices Card */}
        <div className="analytics-card devices-card">
          <h3>Active Devices</h3>
          <div className="devices-stats">
            <span className="devices-active">{devicesInfo.activeDevices}</span>
            <span className="devices-total">/ {devicesInfo.totalDevices} total</span>
          </div>
          <div className="devices-bar">
            <div
              className="devices-bar-active"
              style={{ width: `${(devicesInfo.activeDevices / devicesInfo.totalDevices) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 