import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// BrowserRouter allows page navigation without reloading the page
import { BrowserRouter } from 'react-router-dom';

// These providers make auth and event data available across the whole app
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Render the whole app into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);