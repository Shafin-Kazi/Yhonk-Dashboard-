import React from 'react';
import { useNavigate } from "react-router-dom";
import './Signup.css';

const SignUp = () => {
    const navigate = useNavigate();

    //this uses the local storage to store the data which is not safe here we can use firebase or our own database
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Save to localStorage (not secure, for testing only)
    const user = { name, email, password };
    localStorage.setItem('yhonk-user', JSON.stringify(user));

    alert('Signup successful! You can now login.');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="card signup-card">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtitle">We Heartfully Welcome You to <b>YHonk</b></p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Create New Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
          </div>
          <p className="signup-footer">
            Already have an account? <a href="/login" className="signup-link">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
