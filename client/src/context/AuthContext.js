import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// AuthProvider to wrap the app with authentication context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Check if user is logged in (can be from localStorage, etc.)
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token); // Save token
    localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
    setUser(data.user); // Set user state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('user'); // Remove user data
    setUser(null); // Set user state to null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
