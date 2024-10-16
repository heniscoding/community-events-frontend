import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [registrations, setRegistrations] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage('Error fetching events. Please try again.');
    }
  };

  const fetchRegistrations = async () => {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/api/events/my-registrations', {
        headers: {
          'x-auth-token': token,
        },
      });
      
      const registeredEventIds = response.data.map((registration) => registration.event._id);
      setRegistrations(registeredEventIds);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setMessage('Error fetching registrations. Please try again.');
    }
  };

  const getRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/400/300`;
  };

  useEffect(() => {
    fetchEvents();
    const token = localStorage.getItem('token');
    if (token) {
      fetchRegistrations();
    }
  }, []);

  return (
    <div className="event-list-container">
      <h1>Upcoming Events</h1>
      {message && <div className="message">{message}</div>}
      <div className="event-card-container">
        {events.map((event) => (
          <div key={event._id} className="event-card">
          
              <img
                src={getRandomImage()}
                alt={event.name}
                className="event-image"
              />
              <div className="event-info">
              <Link to={`/events/${event._id}`} className="event-link"><h2>{event.name}</h2></Link>
                <p>{new Date(event.date).toLocaleString()}</p>
                <p>{event.description}</p>
                {registrations.includes(event._id) && <p className="registered-label">Registered</p>}
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;