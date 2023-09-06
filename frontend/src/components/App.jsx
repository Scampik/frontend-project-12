import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import LoginPage from './loginPage/Login';
import ChatPage from './chatPage/MainPage.jsx';
import PageNotFound from './notFoundPage/PageNotFound.jsx';
import SignUp from './registrationPage/Registration.jsx';
import routes from '../routes.js';
import { useAuth } from '../context/AuthContext.jsx';
import loginImage from '../assets/login.webp';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.userName ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const SignUpRoute = () => {
  const auth = useAuth();
  return auth.userName ? <Navigate to={routes.chatPage()} /> : <SignUp />;
};

const LoginRoute = () => {
  const auth = useAuth();
  return auth.userName ? <Navigate to={routes.chatPage()} /> : <LoginPage />;
};

const PageNotFoundRoute = () => {
  const auth = useAuth();
  return auth.userName ? <Navigate to={routes.chatPage()} /> : <PageNotFound />;
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.userName ? (
    <Button onClick={auth.logOut}>{t('exit')}</Button>
  ) : (
    <></>
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <div className="container">
            <Navbar.Brand as={Link} to={routes.chatPage()} className="text-dark fs-4 fw-semibold">
              {t('siteName')}
              <img
                src={loginImage}
                height={20}
                width={20}
                className="rounded-circle"
                alt={t('enter')}
              />
            </Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route element={<div>{t('noPageSelected')}</div>} />
          <Route path={routes.loginPage()} element={<LoginRoute />} />
          <Route path={routes.notFoundPage()} element={<PageNotFoundRoute />} />
          <Route path={routes.signupPage()} element={<SignUpRoute />} />
          <Route path={routes.chatPage()} element={<PrivateRoute />}>
            <Route path="" element={<ChatPage />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
