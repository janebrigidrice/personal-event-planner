

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';

function AddEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { currentUser } = useAuth();

  // Store the values entered into the form
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    description: '',
    location: '',
  });

  // Store any validation errors
  const [error, setError] = useState('');

  // Update state as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, date, time, description, location } = formData;

    // Check that all fields are completed
    if (!name || !date || !time || !description || !location) {
      setError('All fields are required.');
      return;
    }

    // Add the event and connect it to the current user
    addEvent(formData, currentUser.username);

    // Clear errors and return to dashboard
    setError('');
    navigate('/dashboard');
  };

  return (
    <section className="page-container">
      <div className="form-card">
        <h2>Add Event</h2>

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

          {/* Show form error */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Save Event</button>
        </form>
      </div>
    </section>
  );
}

export default AddEvent;