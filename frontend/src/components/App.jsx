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
import SignUpPage from './signUpPage/signUp.jsx';
import routes from '../routes.js';
import { useAuth } from '../context/AuthContext.jsx';
import loginImage from '../assets/login.webp';

const PrivatePage = ({ isLoginPage = false, isSignUpPage = false }) => {
  const auth = useAuth();

  if (isLoginPage) {
    return auth.userName ? <Navigate to={routes.chatPage()} /> : <Outlet />;
  }

  if (isSignUpPage) {
    return auth.userName ? <Navigate to={routes.chatPage()} /> : <Outlet />;
  }

  return auth.userName ? <Outlet /> : <Navigate to={routes.loginPage()} />;
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
