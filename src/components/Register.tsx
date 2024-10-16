import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Optional CSS file for styling
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/register', {
        email,
        password,
      });

      // Redirect to login page after successful registration
      navigate('/login'); // Change this to use navigate
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Error during registration');
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
