/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const currentUser = JSON.parse(localStorage.getItem('userData'));

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser || null);
  const logIn = (name) => {
    localStorage.setItem('userData', JSON.stringify(name));
    setUser(name);
  };
  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getAuthHeader = (userData) => {
  if (userData && userData.token) {
    return { Authorization: `Bearer ${userData.token}` };
  }
  return {};
};

export default AuthProvider;
