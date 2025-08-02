import './Sidebar.css';
import {
  LayoutDashboard, Cpu, User2, Car, MapPin, BellRing, BarChart2, FileText, Settings, LogOut, User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Devices", icon: Cpu, to: "/devices" },
  { label: "Drivers", icon: User2, to: "/drivers" },
  { label: "Vehicles", icon: Car, to: "/vehicles" },
  { label: "Driver Dashboard", icon: User, to: "/driver-dashboard" },
  { label: "Silent Zones", icon: MapPin, to: "/silent-zones" },
  { label: "Analytics", icon: BarChart2, to: "/analytics" },
  { label: "Reports", icon: FileText, to: "/reports" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

const reportsSubLinks = [
  { label: "Horn Duration Report", to: "/reports/horn-duration" },
  { label: "Horn Summary Report", to: "/reports/horn-summary" },
  { label: "Horn Summary Chart", to: "/reports/horn-chart" },
];

export default function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(location.pathname.startsWith('/reports'));
  const user = { name: "Vaibhav Panday" };

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.documentElement.style.setProperty('--sidebar-width', '256px');
    document.documentElement.style.setProperty('--sidebar-state', 'expanded');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.documentElement.style.setProperty('--sidebar-width', '64px');
    document.documentElement.style.setProperty('--sidebar-state', 'collapsed');
  };

  return (
    <aside 
      className={`sidebar ${isHovered ? 'expanded' : 'collapsed'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      {/* Header */}
      <div>
        <div className="sidebar-header">
          <img 
            src="/yhonk_2.jpg" 
            alt="Yhonk Logo" 
            className="sidebar-logo"
          />
          <span className="sidebar-title">Aministration</span>
        </div>
        
        {/* Menu */}
        <nav className="sidebar-menu">
          {menu.map(({ label, icon: Icon, to }) => {
            if (label === "Reports") {
              const active = location.pathname.startsWith('/reports');
              return (
                <div key="Reports" className="reports-container">
                  <button
                    className={`sidebar-link${active ? ' active' : ''}`}
                    onClick={() => setReportsOpen(v => !v)}
                  >
                    <Icon size={22} className="sidebar-icon" />
                    <span className="sidebar-text">{label}</span>
                    <svg 
                      className={`chevron-icon${reportsOpen ? ' open' : ''}`}
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </button>
                  
                  <div className={`sidebar-sublinks${reportsOpen ? ' open' : ''}`}>
                    {reportsSubLinks.map(sub => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className={`sidebar-sublink${location.pathname === sub.to ? ' active' : ''}`}
                      >
                        <span className="sidebar-text">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            const active = location.pathname.startsWith(to);
            return (
              <Link
                key={label}
                to={to}
                className={`sidebar-link${active ? ' active' : ''}`}
                title={label}
              >
                <Icon size={22} className="sidebar-icon" />
                <span className="sidebar-text">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* User Section */}
      <div className="sidebar-user">
        <User className="user-avatar" size={24} />
        <div className="user-info">
          <span className="user-name">{user.name}</span>
        </div>
        <button
          className="logout-btn"
          onClick={() => window.confirm("Are you sure you want to logout?") && alert("Logged out!")}
          title="Logout"
        >
          <LogOut size={18} />
          <span className="sidebar-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}