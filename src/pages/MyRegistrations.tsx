import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MyRegistrations.css";

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
  const [toast, setToast] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  // Use the environment variable for the API URL
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchRegistrations = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showMessage("You need to be logged in to view your registrations.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/events/my-registrations`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      showMessage("Error fetching registrations. Please try again.");
    }
  }, [API_URL]);

  const handleUnregister = async (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showMessage("You need to be logged in to unregister from an event.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/events/${eventId}/signup`, {
        headers: {
          "x-auth-token": token,
        },
      });
      showMessage("Unregistered successfully!");
      fetchRegistrations();
    } catch (error) {
      console.error("Error unregistering from event:", error);
      showMessage("Error unregistering from the event. Please try again.");
    }
  };

  const showMessage = (msg: string) => {
    setToast(msg);
    setShowOverlay(true);
    setTimeout(() => {
      setToast("");
      setShowOverlay(false);
    }, 4000);
  };

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return (
    <div className="my-registrations-container">
      <h1>My Registrations</h1>
      <div className="registrations-list">
        {registrations.length > 0 ? (
          registrations.map((registration) => (
            <div key={registration.event._id} className="registration-card">
              <h2>{registration.event.name}</h2>
              <p>{new Date(registration.event.date).toLocaleString()}</p>
              <p>{registration.event.description}</p>
              <Link
                to={`/events/${registration.event._id}`}
                className="details-button"
              >
                Show full event details
              </Link>
              <button
                onClick={() => handleUnregister(registration.event._id)}
                className="unregister-button"
              >
                Unregister
              </button>
            </div>
          ))
        ) : (
          <p>You have no registrations.</p>
        )}
      </div>
      {showOverlay && <div className="toast-overlay overlay-show"></div>}
      {toast && <div className="toast show">{toast}</div>}
    </div>
  );
};

export default MyRegistrations;
