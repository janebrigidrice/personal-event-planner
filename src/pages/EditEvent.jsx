

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

function EditEvent() {
  // Get event ID from the URL
  const { id } = useParams();

  const navigate = useNavigate();
  const { getEventById, updateEvent } = useEvents();

  // Find the event that matches the ID
  const existingEvent = getEventById(id);

  // Start the form with the existing event's values
  const [formData, setFormData] = useState(
    existingEvent || {
      name: '',
      date: '',
      time: '',
      description: '',
      location: '',
    }
  );

  // Store validation errors
  const [error, setError] = useState('');

  // If no matching event exists, show a message
  if (!existingEvent) {
    return (
      <section className="page-container">
        <p>Event not found.</p>
      </section>
    );
  }

  // Update the form state when typing
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save the updated event
  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, date, time, description, location } = formData;

    // Check all fields are filled in
    if (!name || !date || !time || !description || !location) {
      setError('All fields are required.');
      return;
    }

    // Update the event in context
    updateEvent(formData);

    setError('');
    navigate('/dashboard');
  };

  return (
    <section className="page-container">
      <div className="form-card">
        <h2>Edit Event</h2>

        <form onSubmit={handleSubmit}>
          <label>Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          {/* Show validation error */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Update Event</button>
        </form>
      </div>
    </section>
  );
}

export default EditEvent;