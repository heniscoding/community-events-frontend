import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./EventList.css";

const truncateDescription = (description, wordLimit) => {
  const words = description.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : description;
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("all");
  const [eventFetchError, setEventFetchError] = useState("");
  const [registrationFetchError, setRegistrationFetchError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/events`);
      setEvents(response.data.events);
      setFilteredEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventFetchError("Error fetching events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, skipping registration fetch.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/events/my-registrations`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const registeredEventIds = response.data.map(
        (registration) => registration.event._id
      );
      setRegistrations(registeredEventIds);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrationFetchError("Error fetching registrations. Please try again.");
    }
  };

  useEffect(() => {
    fetchEvents();
    const token = localStorage.getItem("token");
    if (token) {
      fetchRegistrations();
    }
  }, [API_URL]);

  useEffect(() => {
    const results = events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        eventType === "all" || event.type.toLowerCase() === eventType;
      return matchesSearch && matchesType;
    });
    setFilteredEvents(results);
  }, [searchTerm, eventType, events]);

  return (
    <div className="events">
      <header className="home-header">
        <h1>Explore Your Local Community Events</h1>
        <div className="home-header-content">
          <p>
            Find the perfect event for you from our comprehensive list of
            offerings. Use the search feature below to quickly locate events by
            name, and easily filter between free and paid options to suit your
            preferences. Whether you’re looking for casual meetups or exclusive
            ticketed experiences, this is your go-to spot to see everything
            happening.
          </p>
        </div>
      </header>
      <div className="event-list-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search for an event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="event-type-filter"
          >
            <option value="all">All Events</option>
            <option value="free">Free Events</option>
            <option value="paid">Paid Events</option>
          </select>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {eventFetchError && (
              <div className="message">{eventFetchError}</div>
            )}
            {localStorage.getItem("token") && registrationFetchError && (
              <div className="message">{registrationFetchError}</div>
            )}
            {filteredEvents.length > 0 ? (
              <ul className="events-list">
                {filteredEvents.map((event) => (
                  <li key={event._id} className="event-item">
                    <img
                      src={
                        event.imageUrl
                          ? event.imageUrl
                          : "https://via.placeholder.com/150"
                      }
                      alt={event.name}
                      className="event-image"
                    />
                    <div className="event-info">
                      <h3>{event.name}</h3>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>
                        <strong>Type:</strong> {event.type}
                      </p>
                      <div className="event-description">
                        <p>
                          <strong>Details:</strong>{" "}
                          {truncateDescription(event.description, 20)}
                        </p>
                      </div>
                      <Link to={`/events/${event._id}`} className="event-link">
                        View Details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="message">No events found.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventList;
