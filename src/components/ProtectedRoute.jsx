

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute checks whether a user is logged in
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If there is no logged-in user, send them back to login
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If logged in, show the protected page
  return children;
}

export default ProtectedRoute;