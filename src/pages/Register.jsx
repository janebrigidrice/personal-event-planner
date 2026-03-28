

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  // Store validation error messages
  const [error, setError] = useState('');

  // Update form state when the user types
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

    const { name, email, username, password } = formData;

    // Check for empty fields
    if (!name || !email || !username || !password) {
      setError('All fields are required.');
      return;
    }

    // Check if email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Try to register the user
    const result = register(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Clear errors and go back to login page
    setError('');
    navigate('/');
  };

  return (
    <section className="page-container">
      <div className="form-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

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

          {/* Show validation errors if any */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;