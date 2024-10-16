import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('free');
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventCapacity, setEventCapacity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    setSuccess('');
    
    if (!eventName || !eventDate || !eventDescription || !eventImageUrl || !eventCategory || !eventCapacity) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/events',
        {
          name: eventName,
          date: eventDate,
          description: eventDescription,
          type: eventType,
          imageUrl: eventImageUrl, 
          category: eventCategory,  
          capacity: eventCapacity
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      
      setSuccess('Event successfully created!');

      setEventName('');
      setEventDate('');
      setEventDescription('');
      setEventType('free');
      setEventImageUrl('');
      setEventCategory('');
      setEventCapacity('');

      setTimeout(() => {
        navigate('/events');
      }, 1000);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(`Error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
          setError('Error: No response from server. Please try again.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        setError('Error creating event');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError('');
    setSuccess('');
    const { id, value } = e.target;
    switch (id) {
      case 'eventName':
        setEventName(value);
        break;
      case 'eventDate':
        setEventDate(value);
        break;
      case 'eventDescription':
        setEventDescription(value);
        break;
      case 'eventType':
        setEventType(value);
        break;
      case 'eventImageUrl':
        setEventImageUrl(value);
        break;
      case 'eventCategory':
        setEventCategory(value);
        break;
      case 'eventCapacity':
        setEventCapacity(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="datetime-local"
            id="eventDate"
            value={eventDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="eventImageUrl">Event Image URL</label>
          <input
            type="text"
            id="eventImageUrl"
            value={eventImageUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventCategory">Event Category</label>
          <input
            type="text"
            id="eventCategory"
            value={eventCategory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventCapacity">Event Capacity</label>
          <input
            type="number"
            id="eventCapacity"
            value={eventCapacity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            value={eventType}
            onChange={handleInputChange}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button type="submit" className="btn">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
