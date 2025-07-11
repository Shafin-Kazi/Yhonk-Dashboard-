import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-container modern-bg">
      <div className="landing-content fade-in larger">
        <img src="/yhonk_logo.jpg" alt="Yhonk Logo" className="landing-logo" />
        <h1 className="landing-title">Welcome to Yhonk Dashboard</h1>
        <p className="landing-tagline">Smart Vehicle & Driver Monitoring for Safer Roads</p>
        <p className="landing-desc">
          <b>Yhonk</b> is a next-generation platform designed to revolutionize road safety and fleet management. Monitor vehicles and drivers in real time, analyze horn usage, manage silent zones, and generate insightful reports—all in one powerful, easy-to-use dashboard. Empower your organization to reduce noise pollution, improve compliance, and make data-driven decisions for a safer, smarter future.
        </p>
        <div className="landing-btn-group">
          <button
            className="landing-btn"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>
          <button
            className="landing-btn secondary"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="landing-btn"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="landing-bg-shape" />
    </div>
  );
} 