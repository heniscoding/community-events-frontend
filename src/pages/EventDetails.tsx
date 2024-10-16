import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    const checkUserRegistration = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/events/my-registrations`, {
          headers: {
            'x-auth-token': token,
          },
        });
        const registeredEvents = response.data.map((registration: { event: { _id: string } }) => registration.event._id);
        setIsRegistered(registeredEvents.includes(eventId));
      } catch (error) {
        console.error('Error checking registration status:', error);
        setMessage('Error checking registration status.');
      }
    };

    fetchEventDetails();
    checkUserRegistration();

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [eventId]);

  const handleSignUp = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You need to be logged in to register for this event.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/events/${eventId}/signup`,
        {}, 
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      setMessage(`Successfully registered for ${event?.name}!`);
      setIsRegistered(true);
    } catch (error) {
      console.error('Error signing up for event:', error);
      setMessage('Error registering for the event. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.name} className="event-image" />
      )}

      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location || 'N/A'}</p>
      <p><strong>Description:</strong> {event.description || 'N/A'}</p>
      <p><strong>Category:</strong> {event.category || 'N/A'}</p>
      <p><strong>Capacity:</strong> {event.capacity ? `${event.capacity} participants` : 'No limit'}</p>
      
      <h2>Attendees:</h2>
      <ul>
        {event.participants.map((participant: { email: string }, index: number) => ( 
          <li key={index}>{participant.email}</li>
        ))}
      </ul>

      {isLoggedIn ? (
        <button onClick={handleSignUp} className="sign-up-button" disabled={isRegistered}>
          {isRegistered ? 'Registered' : 'Sign Up'}
        </button>
      ) : (
        <p className="message">
          Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to sign up for this event.
        </p> 
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EventDetails;