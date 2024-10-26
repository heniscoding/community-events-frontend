import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventList from "./pages/EventList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyRegistrations from "./pages/MyRegistrations";
import EventDetails from "./pages/EventDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./AuthContext";
import Footer from "./components/Footer";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-registrations" element={<MyRegistrations />} />
              <Route
                path="/create-event"
                element={<ProtectedRoute element={<CreateEvent />} />}
              />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
