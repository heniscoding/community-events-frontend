import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('free');
  const [createdBy, setCreatedBy] = useState('user123');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    if (!eventName || !eventDate || !eventDescription || !createdBy) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/events', {
        name: eventName,
        date: eventDate,
        description: eventDescription,
        type: eventType,
        createdBy: createdBy,
      });

      // Clear the form fields
      setEventName('');
      setEventDate('');
      setEventDescription('');
      setEventType('free');
      setCreatedBy('user123');

      // Set success message
      setSuccessMessage('Event created successfully!');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error: ${err.response.data.message || 'An error occurred'}`);
        } else if (err.request) {
          setError('Error: No response from server. Please try again.');
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError('Error creating event');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError('');
    setSuccessMessage('');
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
      case 'createdBy':
        setCreatedBy(value);
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
        <div className="form-group">
          <label htmlFor="createdBy">Created By</label>
          <input
            type="text"
            id="createdBy"
            value={createdBy}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit" className="btn">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
