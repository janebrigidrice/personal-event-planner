

import { createContext, useContext, useEffect, useState } from 'react';

// Create a new authentication context
const AuthContext = createContext();

// AuthProvider makes auth data available to all child components
export function AuthProvider({ children }) {
  // Load saved users from localStorage when the app first loads
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Load the currently logged-in user from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedCurrentUser = localStorage.getItem('currentUser');
    return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
  });

  // Save users to localStorage whenever the users array changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Save current user whenever login/logout changes it
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  // Register a new user
  const register = (newUser) => {
    // Check whether the username is already taken
    const usernameExists = users.some(
      (user) => user.username === newUser.username
    );

    if (usernameExists) {
      return { success: false, message: 'Username already exists.' };
    }

    // Add the new user to the users array
    setUsers([...users, newUser]);
    return { success: true };
  };

  // Log in an existing user
  const login = (username, password) => {
    // Find a user with matching username and password
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      return { success: true };
    }

    return { success: false, message: 'Invalid username or password.' };
  };

  // Log out the current user
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to make the context easier to use
export function useAuth() {
  return useContext(AuthContext);
}