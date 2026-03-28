

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  // Get current user and logout function from auth context
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout button click
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="logo">Event Planner</h1>

        <nav className="nav-links">
          {/* Main navigation links */}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add-event">Add Event</Link>
          <Link to="/help">Help</Link>

          {/* Show different links depending on login status */}
          {currentUser ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;