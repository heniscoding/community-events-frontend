import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAuthenticated = !!localStorage.getItem("token");

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events`);

        if (Array.isArray(response.data)) {
          const latestEvents = response.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6);
          setEvents(latestEvents);
        } else if (response.data.events) {
          const latestEvents = response.data.events
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6);
          setEvents(latestEvents);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_URL]);

  if (loading) return <Spinner />;

  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Community Events Hub!</h1>
        <div className="home-header-content">
          <p>
            Join us for a variety of community events that bring people
            together! Here, you’ll discover a vibrant collection of activities
            designed to foster connections, celebrate diversity, and enrich our
            local culture. Whether you’re looking to meet new friends,
            participate in engaging workshops, or simply enjoy a day of fun with
            your family, we have something for everyone.
          </p>
          <p>
            Stay connected with us to keep up with the latest happenings and
            mark your calendars for upcoming events. Together, let’s create a
            stronger, more vibrant community—one event at a time!
          </p>
          {!isAuthenticated && (
            <div className="auth-buttons">
              <a href="/login" className="cta-button">
                Login to Register for events
              </a>
              <a href="/register" className="caa-button">
                Create an Account
              </a>
            </div>
          )}
        </div>
      </header>

      <section className="events-section">
        <h2 className="latest">Latest</h2>
        {events.length > 0 ? (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event._id} className="event-item">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="event-image"
                  />
                )}
                <div className="home-card-details">
                  <h3>{event.name}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    {event.category || "Not specified"}
                  </p>
                  <p>
                    <strong>Type:</strong> {event.type}
                  </p>
                  <div className="event-description">
                    <p>
                      <strong>Event Details:</strong>{" "}
                      {truncateDescription(event.description, 10)}
                    </p>
                    <a href={`/events/${event._id}`} className="event-link">
                      View Details
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events at the moment. Check back soon!</p>
        )}
      </section>
    </div>
  );
};

export default Home;
