import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [randomEvents, setRandomEvents] = useState<any[]>([]);

  const fetchEventDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/events/${eventId}`
      );
      setEvent(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching event details");
      setLoading(false);
    }
  }, [eventId]);

  const fetchRandomEvents = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      console.log(response.data);
      if (response.data && Array.isArray(response.data.events)) {
        const otherEvents = response.data.events.filter(
          (e: any) => e._id !== eventId
        );
        const shuffledEvents = otherEvents.sort(() => 0.5 - Math.random());
        setRandomEvents(shuffledEvents.slice(0, 3));
      } else {
        console.error("Expected an array of events, but got:", response.data);
        setRandomEvents([]);
      }
    } catch (error) {
      console.error("Error fetching random events:", error);
    }
  }, [eventId]);

  const checkUserRegistration = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/events/my-registrations",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const registeredEvents = response.data.map(
        (registration: { event: { _id: string } }) => registration.event._id
      );
      setIsRegistered(registeredEvents.includes(eventId));
    } catch (error) {
      console.error("Error checking registration status:", error);
      setMessage("Error checking registration status.");
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetails();
    fetchRandomEvents();
    checkUserRegistration();

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [fetchEventDetails, fetchRandomEvents, checkUserRegistration]);

  const handleSignUp = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to be logged in to register for this event.");
      return;
    }

    if (
      event &&
      event.capacity &&
      event.participants.length >= event.capacity
    ) {
      setMessage(`Sorry, ${event.name} is at full capacity.`);
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/events/${eventId}/signup`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setMessage(
        `You have successfully registered for the ${event?.name} event. ` +
          `<a href="/my-registrations" style="color: #007bff; text-decoration: underline;">Click here to view all your registrations.</a>`
      );
      setIsRegistered(true);
      fetchEventDetails();
    } catch (error) {
      console.error("Error signing up for event:", error);
      setMessage("Error registering for the event. Please try again.");
    }
  };

  const handleUnregister = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to be logged in to unregister from this event.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}/signup`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setMessage(
        `You have successfully unregistered from ${event?.name} Event.`
      );
      setIsRegistered(false);
      fetchEventDetails();
    } catch (error) {
      console.error("Error unregistering from event:", error);
      setMessage("Error unregistering from the event. Please try again.");
    }
  };

  const createGoogleCalendarLink = () => {
    if (!event) return "#";
    const startDate = new Date(event.date)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(event.endDate)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "");
    const eventName = encodeURIComponent(event.name);
    const eventDescription = encodeURIComponent(event.description);
    const eventLocation = encodeURIComponent(event.location || "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startDate}/${endDate}&details=${eventDescription}&location=${eventLocation}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-details-container">
      <div className="event-detail-image-container">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="event-detail-image"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="event-details-header">
        <Link to="/events" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
          &nbsp; Back
        </Link>
      </div>
      <div className="event-details">
        <h1 className="event-name">{event.name}</h1>
        <div className="event-detail-info">
          <div className="info-item">
            <strong>Location:</strong> {event.location || "N/A"}{" "}
          </div>
          <div className="info-item">
            <strong>Category:</strong> {event.category || "N/A"}
          </div>
          <div className="info-item">
            <strong>Starts on:</strong> {new Date(event.date).toLocaleString()}
          </div>
          <div className="info-item">
            <strong>Ends on:</strong> {new Date(event.endDate).toLocaleString()}
          </div>
          <div className="info-item">
            <strong>Location:</strong> {event.location || "N/A"}
          </div>
          <div className="info-item">
            <strong>Capacity:</strong>{" "}
            {event.capacity ? `${event.capacity} participants` : "No limit"}
          </div>
          <div className="info-item">
            <br />
            <strong>
              Further Details:
              <br />
              <br />
            </strong>{" "}
            {event.description || "N/A"}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="registration-actions">
            {isRegistered ? (
              <>
                <button
                  onClick={handleUnregister}
                  className="unregister-button"
                >
                  Unregister
                </button>
                <a
                  href={createGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-calendar-button"
                >
                  Add to Google Calendar
                </a>
              </>
            ) : (
              <button onClick={handleSignUp} className="sign-up-button">
                Sign Up
              </button>
            )}
          </div>
        ) : (
          <p className="message">
            Please <Link to="/login">log in</Link> or{" "}
            <Link to="/register">register</Link> to sign up for this event.
          </p>
        )}

        {message && (
          <div
            className="message"
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        )}
      </div>
      {randomEvents.length > 0 && (
        <div className="other-list-container">
          <h3>Other Events You Might Enjoy!</h3>
          <ul className="other-events-list">
            {randomEvents.map((randomEvent) => (
              <li key={randomEvent._id} className="event-item">
                <img
                  src={
                    randomEvent.imageUrl
                      ? randomEvent.imageUrl
                      : "https://example.com/path/to/fallback-image.jpg"
                  }
                  alt={randomEvent.name}
                  className="event-image"
                />
                <div className="event-info">
                  <h3>{randomEvent.name}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(randomEvent.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {randomEvent.location}
                  </p>
                  <Link
                    to={`/events/${randomEvent._id}`}
                    className="event-link"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
