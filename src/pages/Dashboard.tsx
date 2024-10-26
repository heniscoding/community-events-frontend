import { useAuth } from "../AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { role, username } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        {username && <h2>Welcome, {username}!</h2>}{" "}
        {role === "staff" ? (
          <div>
            <p>
              As a staff member you can create, view and sign up for events.
            </p>
            <ul>
              <a href="/create-event">
                <li>Create Event</li>
              </a>
              <a href="/events">
                <li>View Events</li>
              </a>
              <a href="/my-registrations">
                <li>My Registrations</li>
              </a>
            </ul>
          </div>
        ) : (
          <div>
            <p>
              Here you can view upcoming events and manage your registrations.
            </p>
            <ul>
              <a href="/events">
                <li>View Events</li>
              </a>
              <a href="/my-registrations">
                <li>My Registrations</li>
              </a>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
