import React from 'react';
import { Users, Car, Smartphone, TrendingUp } from 'lucide-react';
import QuickActions from './QuickActions';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Vehicles',
      value: '567',
      change: '+8%',
      icon: Car,
      color: 'green'
    },
    {
      title: 'Total Drivers',
      value: '890',
      change: '+15%',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Total Devices',
      value: '1,456',
      change: '+23%',
      icon: Smartphone,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'vehicle',
      action: 'New vehicle registered',
      details: 'Toyota Camry - MH12AB1234',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'driver',
      action: 'Driver profile updated',
      details: 'John Doe - License renewed',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'device',
      action: 'Device activated',
      details: 'IMEI: 123456789012345',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'vehicle',
      action: 'Vehicle maintenance due',
      details: 'Honda City - Service reminder',
      time: '1 day ago'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to Yhonk Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-change">
                  <TrendingUp size={16} />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
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