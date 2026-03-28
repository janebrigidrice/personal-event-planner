// Import routing components from React Router
import { Routes, Route } from 'react-router-dom';

// Import reusable components and pages
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import Help from './pages/Help';

function App() {
  return (
    <>
      {/* Header appears on every page */}
      <Header />

      {/* Main page content */}
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help" element={<Help />} />

          {/* Protected routes can only be viewed when logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-event/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;