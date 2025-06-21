import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Smartphone, 
  Search, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import VehicleManagement from './components/VehicleManagement';
import DriverManagement from './components/DriverManagement';
import DeviceManagement from './components/DeviceManagement';
import './App.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Car, label: 'Manage Vehicles' },
    { path: '/drivers', icon: Users, label: 'Manage Drivers' },
    { path: '/devices', icon: Smartphone, label: 'Manage Devices' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">Yhonk</h2>
        <button className="close-btn" onClick={toggleSidebar}>
          <X size={20} />
        </button>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={toggleSidebar}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="main-content">
          <header className="header">
            <button className="menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="header-content">
              <h1>Yhonk Dashboard</h1>
              <div className="header-actions">
                <div className="search-box">
                  <Search size={16} />
                  <input type="text" placeholder="Search..." />
                </div>
              </div>
            </div>
          </header>

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vehicles" element={<VehicleManagement />} />
              <Route path="/drivers" element={<DriverManagement />} />
              <Route path="/devices" element={<DeviceManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 