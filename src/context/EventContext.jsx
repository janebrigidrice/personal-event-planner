

import { createContext, useContext, useEffect, useState } from 'react';

// Create event context
const EventContext = createContext();

// EventProvider shares event data with the rest of the app
export function EventProvider({ children }) {
  // Load saved events from localStorage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  // Save events whenever the event list changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Add a new event
  const addEvent = (newEvent, username) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now().toString(), // create a unique ID
      username, // connect the event to the current user
    };

    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  // Update an existing event
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  // Delete an event
  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Find one event by ID
  const getEventById = (id) => {
    return events.find((event) => event.id === id);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// Custom hook for event context
export function useEvents() {
  return useContext(EventContext);
}