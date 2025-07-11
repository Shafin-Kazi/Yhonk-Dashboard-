import React from 'react';
import './Analytics.css';

// Mock data for heatmap (vehicles registered per day)
const heatmapData = [
  [2, 3, 1, 0, 4, 5, 2],
  [1, 2, 3, 2, 1, 0, 4],
  [0, 1, 2, 3, 4, 2, 1],
  [3, 2, 1, 4, 5, 3, 2],
];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const driversInfo = {
  total: 128,
  active: 112,
  inactive: 16,
  newThisMonth: 9,
};

const activeDevices = 97;
const totalDevices = 110;

export default function Analytics() {
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
            <span className="devices-active">{activeDevices}</span>
            <span className="devices-total">/ {totalDevices} total</span>
          </div>
          <div className="devices-bar">
            <div
              className="devices-bar-active"
              style={{ width: `${(activeDevices / totalDevices) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 