import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyRegistrations.css';

interface Registration {
  _id: string;
  event: {
    _id: string;
    name: string;
    date: Date;
    description: string;
  };
}

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [message, setMessage] = useState('');

  const fetchRegistrations = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You need to be logged in to view your registrations.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/events/my-registrations', {
        headers: {
          'x-auth-token': token,
        },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setMessage('Error fetching registrations. Please try again.');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="my-registrations">
      <h1>My Registrations</h1>
      {message && <div className="message">{message}</div>}
      <div className="registrations-list">
        {registrations.length > 0 ? (
          registrations.map((registration) => (
            <div key={registration.event._id} className="registration-card">
              <h2>{registration.event.name}</h2>
              <p>{new Date(registration.event.date).toLocaleString()}</p>
              <p>{registration.event.description}</p>
            </div>
          ))
        ) : (
          <p>You have no registrations.</p>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
