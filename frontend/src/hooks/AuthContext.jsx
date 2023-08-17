import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
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

export default AuthProvider;
