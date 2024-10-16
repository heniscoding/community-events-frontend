import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../AuthContext'; 
import './NavBar.css'; 

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); 
  const [logoutMessage, setLogoutMessage] = useState(''); 

  const handleLogout = () => {
    logout(); 
    setLogoutMessage('Successfully logged out'); 

    setTimeout(() => {
      setLogoutMessage('');
    }, 1000);

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
      {logoutMessage && (
        <div className="logout-overlay">
        <div className="logout-popup">{logoutMessage}</div>
      </div>
      )}
    </nav>
  );
};

export default NavBar;
