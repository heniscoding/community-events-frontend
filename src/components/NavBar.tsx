import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-event">Create Event</Link>
        </li>
        <li>
          <Link to="/events">Event List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
