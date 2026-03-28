

import { Link } from 'react-router-dom';

// EventCard shows the details for one event
function EventCard({ event, onDelete }) {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Time:</strong> {event.time}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Description:</strong> {event.description}
      </p>

      <div className="event-actions">
        {/* Edit button links to the edit page for this event */}
        <Link to={`/edit-event/${event.id}`} className="edit-btn">
          Edit
        </Link>

        {/* Delete button calls the delete function passed in from Dashboard */}
        <button className="delete-btn" onClick={() => onDelete(event.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;