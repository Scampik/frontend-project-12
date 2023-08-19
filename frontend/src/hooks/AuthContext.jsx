import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const currentUser = JSON.parse(localStorage.getItem('userId'));

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (name) => {
    localStorage.setItem('userId', JSON.stringify(name));
    setUserName(name);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ userName, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getAuthHeader = () => {
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  return {};
};

export default AuthProvider;
