import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

import LoginPage from './Login';
import MainPage from './MainPage';
import PrivatePage from './ChatPage';
import AuthContext from '../contexts/index.jsx';
import PageNotFound from './PageNotFound.jsx';
import SignUp from './Registration';
import useAuth from '../hooks/index.jsx';

// import { useDispatch, useSelector } from 'react-redux';
// import { getPostThunk } from '../api/getPost.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log(children)
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}  
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
        <Navbar className='shadow-sm' bg="white" expand="lg">
          <div className="container">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <AuthButton />
          </div>
          
        </Navbar>
          <Routes>
                <Route element={<div>No page is selected.</div> } />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="/" element={(
                    <PrivateRoute>
                      <PrivatePage />
                    </PrivateRoute>
                  )}
                  />
          </Routes>
        </div>
        <div className='Toastify'></div>
      </Router>
    </AuthProvider>
  );
}

export default App;