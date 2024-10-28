import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("free");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(
    null
  );
  const [eventCategory, setEventCategory] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !eventName ||
      !eventLocation ||
      !eventDate ||
      !eventEndDate ||
      !eventDescription ||
      !eventCategory ||
      !eventImage
    ) {
      setError("Please fill in all required fields and upload an image");
      return;
    }

    let capacityNumber;
    if (eventCapacity) {
      capacityNumber = Number(eventCapacity);
      if (isNaN(capacityNumber) || capacityNumber <= 0) {
        setError("Capacity must be a positive number if provided");
        return;
      }
    }

    const selectedStartDate = new Date(eventDate);
    const selectedEndDate = new Date(eventEndDate);
    const now = new Date();
    if (selectedStartDate <= now) {
      setError("Event start date must be in the future");
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      setError("End date must be after start date");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", eventName);
      formData.append("location", eventLocation);
      formData.append("date", selectedStartDate.toISOString());
      formData.append("endDate", selectedEndDate.toISOString());
      formData.append("description", eventDescription);
      formData.append("type", eventType);
      formData.append("category", eventCategory);

      if (capacityNumber) {
        formData.append("capacity", capacityNumber.toString());
      }

      formData.append("image", eventImage);

      await axios.post(`${API_URL}/api/events`, formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Event successfully created!");

      setEventName("");
      setEventLocation("");
      setEventDate("");
      setEventEndDate("");
      setEventDescription("");
      setEventType("free");
      setEventImage(null);
      setEventImagePreview(null);
      setEventCategory("");
      setEventCapacity("");

      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          `Error: ${error.response.data.message || "An error occurred"}`
        );
      } else {
        setError("Error creating event");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError("");
    setSuccess("");
    const { id, value } = e.target;
    switch (id) {
      case "eventName":
        setEventName(value);
        break;
      case "eventLocation":
        setEventLocation(value);
        break;
      case "eventDate":
        setEventDate(value);
        break;
      case "eventEndDate":
        setEventEndDate(value);
        break;
      case "eventDescription":
        setEventDescription(value);
        break;
      case "eventType":
        setEventType(value);
        break;
      case "eventCategory":
        setEventCategory(value);
        break;
      case "eventCapacity":
        setEventCapacity(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="create-page-container">
      <div className="create-event-container">
        <h1>Create an Event</h1>
        <p>
          Fill in your event details below and then click the 'Create Event'
          button.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="create-event-form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventLocation">Location</label>
            <input
              type="text"
              id="eventLocation"
              value={eventLocation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventDate">Event Start Date and Time</label>
            <input
              type="datetime-local"
              id="eventDate"
              value={eventDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventEndDate">Event End Date and Time</label>
            <input
              type="datetime-local"
              id="eventEndDate"
              value={eventEndDate}
              onChange={handleInputChange}
              required
              min={eventDate}
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea
              id="eventDescription"
              value={eventDescription}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventImage">Event Image</label>
            <input
              type="file"
              id="eventImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {eventImagePreview && (
              <div className="image-preview">
                <img src={eventImagePreview} alt="Event Preview" />
              </div>
            )}
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventCategory">Event Category</label>
            <input
              type="text"
              id="eventCategory"
              value={eventCategory}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="eventCapacity">Event Capacity</label>
            <input
              type="number"
              id="eventCapacity"
              value={eventCapacity}
              onChange={handleInputChange}
              placeholder="Enter capacity (leave empty for unlimited)"
            />
          </div>
          <div className="create-event-form-group">
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
          <button type="submit" className="create-event-btn">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
