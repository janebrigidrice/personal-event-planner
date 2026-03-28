

import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';

function Dashboard() {
  // Get the current user from auth context
  const { currentUser } = useAuth();

  // Get all events and the delete function from event context
  const { events, deleteEvent } = useEvents();

  // Only show events belonging to the logged-in user
  const userEvents = events.filter(
    (event) => event.username === currentUser.username
  );

  // Sort events by date and time, earliest first
  const sortedEvents = [...userEvents].sort((a, b) => {
    const firstDate = new Date(`${a.date}T${a.time}`);
    const secondDate = new Date(`${b.date}T${b.time}`);
    return firstDate - secondDate;
  });

  return (
    <section className="page-container">
      <div className="dashboard-header">
        <h2>Welcome, {currentUser.name}</h2>
        <p>Here are your upcoming events.</p>
      </div>

      {/* If there are no events, show a message */}
      {sortedEvents.length === 0 ? (
        <p className="empty-message">
          You have no events yet. Add your first event.
        </p>
      ) : (
        // Use map() to display one EventCard for each event
        <div className="event-list">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;