import React from 'react';
import { useAuth } from '../AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { role, email } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {email && <h2>Welcome, {email}!</h2>}
      {role === 'staff' ? (
        <div>
          <p>Here you can manage events and view analytics.</p>
          <ul>
          <a href="/create-event"><li>Create Event</li></a>
          <a href="/events"><li>View Events</li></a>
          </ul>
        </div>
      ) : (
        <div>
          <p>Here you can view upcoming events and manage your registrations.</p>
          <ul>
          <a href="/events"><li>View Events</li></a>
          <a href="/my-registrations"><li>My Registrations</li></a>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;