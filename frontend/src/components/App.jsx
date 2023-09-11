import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { MoonStars, SunFill } from 'react-bootstrap-icons';

import LoginPage from './loginPage/Login';
import ChatPage from './chatPage/MainPage.jsx';
import PageNotFound from './notFoundPage/PageNotFound.jsx';
import SignUpPage from './signUpPage/signUp.jsx';
import routes from '../routes.js';
import { useAuth } from '../context/AuthContext.jsx';
import loginImage from '../assets/login.webp';

const PrivatePage = ({ isLoginPage = false, isSignUpPage = false }) => {
  const auth = useAuth();

  if (isLoginPage) {
    return auth.user ? <Navigate to={routes.chatPage()} /> : <Outlet />;
  }

  if (isSignUpPage) {
    return auth.user ? <Navigate to={routes.chatPage()} /> : <Outlet />;
  }

  return auth.user ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.user ? (
    <Button onClick={auth.logOut}>{t('exit')}</Button>
  ) : (
    <></>
  );
};

const ThemeButton = () => {
  const [theme, setTheme] = useState('dark');
  const handleTheme = () => (theme === 'light' ? setTheme('dark') : setTheme('light'));

  useEffect(() => {
    const body = document.querySelector('body');
    body.removeAttribute('data-bs-theme');
    body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <div className="m-2 ps-3 pe-3">
      { theme === 'light'
        ? (
          <SunFill
            size={20}
            onClick={handleTheme}
          />
        ) : (
          <MoonStars
            size={20}
            onClick={handleTheme}
          />
        )}
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="d-flex flex-column h-100 bg-body">
        <Navbar className="shadow-sm bg-body-tertiary justify-content-between" expand="lg">
          <Container className="pe-0 me-0">
            <Navbar.Brand as={Link} to={routes.chatPage()} className="fs-4 fw-semibold mr-auto">
              {t('siteName')}
              <img
                src={loginImage}
                height={30}
                width={30}
                className="rounded-circle bg-light m-2 border border-opacity-25 border-light-emphasis"
                alt={t('enter')}
              />
            </Navbar.Brand>
            <AuthButton />
          </Container>
          <ThemeButton />
        </Navbar>
        <Routes>
          <Route path={routes.loginPage()} element={<PrivatePage isLoginPage />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path={routes.signupPage()} element={<PrivatePage isSignUpPage />}>
            <Route path="" element={<SignUpPage />} />
          </Route>
          <Route path={routes.chatPage()} element={<PrivatePage />}>
            <Route path="" element={<ChatPage />} />
          </Route>
          <Route path={routes.notFoundPage()} element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
