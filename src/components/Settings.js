import React, { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Vaibhav Panday', email: 'vaibhav@example.com' });
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({ email: true, sms: false });

  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = e => setTheme(e.target.value);
  const handleNotifChange = e => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">General Settings</h2>
      <form className="settings-form">
        <div className="settings-section">
          <h3>Profile</h3>
          <div className="settings-row">
            <label>Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
          </div>
          <div className="settings-row">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
          </div>
        </div>
        <div className="settings-section">
          <h3>Theme</h3>
          <div className="settings-row">
            <label>
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={handleThemeChange} />
              Light
            </label>
            <label>
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={handleThemeChange} />
              Dark
            </label>
          </div>
        </div>
        <div className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="settings-row">
            <label>
              <input type="checkbox" name="email" checked={notifications.email} onChange={handleNotifChange} />
              Email Notifications
            </label>
            <label>
              <input type="checkbox" name="sms" checked={notifications.sms} onChange={handleNotifChange} />
              SMS Notifications
            </label>
          </div>
        </div>
        <button className="settings-save-btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
} 