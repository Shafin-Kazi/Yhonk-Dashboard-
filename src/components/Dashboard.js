import React, { useEffect, useState } from 'react';
import { Users, Car, Smartphone, TrendingUp } from 'lucide-react';
import QuickActions from './QuickActions';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalDrivers: 0,
    totalDevices: 0,
    changeUsers: '',
    changeVehicles: '',
    changeDrivers: '',
    changeDevices: ''
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats({
        totalUsers: data.totalUsers || 0,
        totalVehicles: data.totalVehicles || 0,
        totalDrivers: data.totalDrivers || 0,
        totalDevices: data.totalDevices || 0,
        changeUsers: data.changeUsers || '',
        changeVehicles: data.changeVehicles || '',
        changeDrivers: data.changeDrivers || '',
        changeDevices: data.changeDevices || ''
      }));

    fetch('http://localhost:5000/api/dashboard/activities')
      .then(res => res.json())
      .then(data => setRecentActivities(Array.isArray(data) ? data : [])); // <-- fix here
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to Yhonk Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-change">
              <TrendingUp size={16} />
              <span>{stats.changeUsers}</span>
            </div>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">
            <Car size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Vehicles</h3>
            <div className="stat-value">{stats.totalVehicles}</div>
            <div className="stat-change">
              <TrendingUp size={16} />
              <span>{stats.changeVehicles}</span>
            </div>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Drivers</h3>
            <div className="stat-value">{stats.totalDrivers}</div>
            <div className="stat-change">
              <TrendingUp size={16} />
              <span>{stats.changeDrivers}</span>
            </div>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">
            <Smartphone size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Devices</h3>
            <div className="stat-value">{stats.totalDevices}</div>
            <div className="stat-change">
              <TrendingUp size={16} />
              <span>{stats.changeDevices}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="dashboard-section">
        <h3>Recent Activities</h3>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'vehicle' && <Car size={16} />}
                {activity.type === 'driver' && <Users size={16} />}
                {activity.type === 'device' && <Smartphone size={16} />}
              </div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-details">{activity.details}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions at the bottom */}
      <QuickActions />
    </div>
  );
};

export default Dashboard; 