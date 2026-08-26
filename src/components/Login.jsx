import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      setError("");
      if (onLoginSuccess) {
        onLoginSuccess(username);
      } else {
        window.location.reload();
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* The curved background shape for the left panel */}
        <div className="bg-circle"></div>

        {/* Left Side */}
        <div className="login-left">
          <div className="logo-container">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8 2 4 5 4 9C4 11.5 5.5 13.5 7.5 14.5C6 15.5 5 17 5 19C5 21 8 22 12 22C16 22 19 21 19 19C19 17 18 15.5 16.5 14.5C18.5 13.5 20 11.5 20 9C20 5 16 2 12 2ZM12 4C14.5 4 17 6 17 9C17 11.5 15 13 13 13C12.5 13 12 12.5 12 12C12 12.5 11.5 13 11 13C9 13 7 11.5 7 9C7 6 9.5 4 12 4ZM12 20C9.5 20 7 19 7 17C7 15.5 8.5 14.5 10.5 14.5C11 14.5 11.5 15 12 15.5C12.5 15 13 14.5 13.5 14.5C15.5 14.5 17 15.5 17 17C17 19 14.5 20 12 20Z" />
            </svg>
            
          </div>
          <div className="welcome-text">
            Welcome to the<br />LifePilot!
          </div>
        </div>
        
        {/* Right Side */}
        <div className="login-right">
          
          <div className="login-title">Login below to get started.</div>
          
          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="form-group">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
              </svg>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
              </svg>
              <input 
                type="password" 
                placeholder="Your Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-options">
              <input type="checkbox" id="keep-logged" />
              <label htmlFor="keep-logged">Keep me logged in</label>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-btn">Login</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
