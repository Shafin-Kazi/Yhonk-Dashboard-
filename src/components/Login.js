import React from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    //this uses the local storage to store the data which is not safe here we can use firebase or our own database
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const storedUser = JSON.parse(localStorage.getItem('yhonk-user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
            />
          </div>
          <div className="form-group" style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </div>
          <p className="login-footer">
            Don't have an account? <a href="/Signup" className="login-link">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
