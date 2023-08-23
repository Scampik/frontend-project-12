import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
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

const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth.userName ? (
    <Outlet />
  ) : (
    <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
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
            <Navbar.Brand as={Link} to={routes.chatPage()}>
              {t('siteName')}
            </Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route element={<div>{t('noPageSelected')}</div>} />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.notFoundPage()} element={<PageNotFound />} />
          <Route path={routes.signupPage()} element={<SignUp />} />
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
