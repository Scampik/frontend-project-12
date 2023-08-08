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
import ChatPage from './ChatPage';
import PageNotFound from './PageNotFound.jsx';
import SignUp from './Registration';
import { useAuth, useWSocket } from '../hooks/index.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.userName ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userName
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => {
  
  return (
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
                        <ChatPage />
                      </PrivateRoute>
                    )}
                    />
            </Routes>
          </div>
          <div className='Toastify'></div>
        </Router>
  );
}

export default App;