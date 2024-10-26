import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutMessage, setLogoutMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutMessage("Successfully logged out");

    setTimeout(() => {
      setLogoutMessage("");
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Community Events
        </Link>
        <button className="burger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
        <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              className={getLinkClass("/")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={getLinkClass("/events")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Events
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={getLinkClass("/dashboard")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className={getLinkClass("/register")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={getLinkClass("/login")}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {logoutMessage && (
        <div className="logout-overlay">
          <div className="logout-popup">{logoutMessage}</div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
