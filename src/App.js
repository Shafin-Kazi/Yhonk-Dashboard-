import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VehicleManagement from './components/VehicleManagement';
import DriverManagement from './components/DriverManagement';
import DeviceManagement from './components/DeviceManagement';
import SilentZones from './components/SilentZones';
import HornDurationReport from './components/reports/HornDurationReport';
import HornSummaryReport from './components/reports/HornSummaryReport';
import HornSummaryChart from './components/reports/HornSummaryChart';
import HornDurationDetail from './components/reports/HornDurationDetail';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import DriverDashboard from './components/driver-dashboard';
import Login from './components/Login';
import SignUp from './components/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} /> {/* New Login Route */}
        <Route path="/signup" element={<SignUp />} />  {/*New Signup route*/}
        <Route
          path="*"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-content" style={{ marginLeft: '16rem' }}>
                <header className="header">
                  <div className="header-content">
                    <h1>Yhonk Dashboard</h1>
                  </div>
                </header>
                <main className="content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vehicles" element={<VehicleManagement />} />
                    <Route path="/drivers" element={<DriverManagement />} />
                    <Route path="/devices" element={<DeviceManagement />} />
                    <Route path="/silent-zones" element={<SilentZones />} />
                    <Route path="/driver-dashboard" element={<DriverDashboard />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/reports/horn-duration" element={<HornDurationReport />} />
                    <Route path="/reports/horn-duration/:recordId" element={<HornDurationDetail />} />
                    <Route path="/reports/horn-summary" element={<HornSummaryReport />} />
                    <Route path="/reports/horn-chart" element={<HornSummaryChart />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
