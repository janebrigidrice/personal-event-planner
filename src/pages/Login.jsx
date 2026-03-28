

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Store login form values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Store error messages
  const [error, setError] = useState('');

  // Update state when typing in the form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle login form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = formData;

    // Check for empty fields
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Try to log in using AuthContext
    const result = login(username, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // If successful, go to the dashboard
    setError('');
    navigate('/dashboard');
  };

  return (
    <section className="page-container">
      <div className="form-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Show login error if there is one */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p>
          Need an account? <Link to="/register">Register here!</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;