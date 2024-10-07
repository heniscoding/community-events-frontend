import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>List of Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>{event.name} - {new Date(event.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
