import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Event Details for {id}</h1>
      <p>Details of the event will go here</p>
    </div>
  );
};

export default EventDetails;
