import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        email,
        password,
      });      
  
      const { token, role, username } = response.data;
  
      login(token, role, email, username);
  
      setShowPopup(true);
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
        setError(err.response?.data.message || "Invalid credentials");
      } else {
        setError("Server error");
      }
    }
  };
  

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showPopup]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>

        <div className="register-link">
          Not signed up? <Link to="/register">Register here</Link>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-message">Login successful!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
