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
  const [collapsed, setCollapsed] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(location.pathname.startsWith('/reports'));
  const user = { name: "Vaibhav Panday" };

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}> 
      {/* Header */}
      <div>
        <div className="sidebar-header">
          <img src="/yhonk_2.jpg" alt="Yhonk Logo" style={{ maxHeight: '38px', width: 'auto', display: 'block' }} />
        </div>
        {/* Menu */}
        <nav className="sidebar-menu">
          {menu.map(({ label, icon: Icon, to }) => {
            if (label === "Reports") {
              const active = location.pathname.startsWith('/reports');
              return (
                <div key="Reports">
                  <button
                    className={`sidebar-link${active ? ' active' : ''}`}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.2rem',
                      color: active ? '#dc2626' : '#fff',
                      boxShadow: active ? '0 2px 8px rgba(220,38,38,0.08)' : 'none',
                      transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#e11d48';
                      e.currentTarget.querySelector('.sidebar-icon').style.color = '#e11d48';
                      e.currentTarget.querySelector('svg').style.color = '#e11d48';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(220,38,38,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'none';
                      e.currentTarget.style.color = active ? '#dc2626' : '#fff';
                      e.currentTarget.querySelector('.sidebar-icon').style.color = '';
                      e.currentTarget.querySelector('svg').style.color = active ? '#dc2626' : '#fff';
                      e.currentTarget.style.boxShadow = active ? '0 2px 8px rgba(220,38,38,0.08)' : 'none';
                    }}
                    onClick={() => setReportsOpen(v => !v)}
                  >
                    <Icon size={22} className="sidebar-icon" />
                    <span>Reports</span>
                    <svg style={{ marginLeft: 'auto', transition: 'transform 0.2s', transform: reportsOpen ? 'rotate(90deg)' : 'rotate(0deg)', color: active ? '#dc2626' : '#fff' }} width="16" height="16" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                  </button>
                  {reportsOpen && (
                    <div className="sidebar-sublinks" style={{ marginLeft: 36, borderLeft: '2px solid #e11d48', paddingLeft: 12, background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      {reportsSubLinks.map(sub => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className={`sidebar-sublink${location.pathname === sub.to ? ' active' : ''}`}
                          style={{ display: 'block', color: location.pathname === sub.to ? '#e11d48' : '#222', padding: '7px 0 7px 8px', textDecoration: 'none', fontWeight: 500, borderRadius: 4, background: location.pathname === sub.to ? '#ffe4e6' : 'transparent', marginBottom: 2 }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            const active = location.pathname.startsWith(to);
            return (
              <Link
                key={label}
                to={to}
                className={`sidebar-link${active ? ' active' : ''}`}
                title={collapsed ? label : undefined}
                style={{ textDecoration: 'none' }}
              >
                <Icon size={22} className="sidebar-icon" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* User Section */}
      <div className="sidebar-user">
        <User className="user-avatar" size={24} />
        <span className="user-name">{user.name}</span>
        <button
          className="logout-btn"
          onClick={() => window.confirm("Are you sure you want to logout?") && alert("Logged out!")}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
} 