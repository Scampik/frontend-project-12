import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getChannels } from '../../slices/channelsSlice.js';
import { loadingSelector, setStatus } from '../../slices/loadingSlice.js';
import { getAuthHeader, useAuth } from '../../context/AuthContext.jsx';
import SpinnerForm from './components/SpinnerForm.jsx';
import MainForm from './components/MainForm.jsx';
import errorImage from '../../assets/unknown.svg';

const uiState = {
  loading: SpinnerForm,
  success: MainForm,
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector(loadingSelector);
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const authHeader = getAuthHeader(auth.userName);
    dispatch(getChannels(authHeader))
      .then(unwrapResult)
      .catch((error) => {
        if (error.status === 401) {
          return auth.logOut();
        } if (error.status === 0) {
          console.log('tyt__+');
          toast.warn(t('toast.networkProblem'));
          return dispatch(setStatus('undefinedError'));
        }
        console.log('ne tut');
        return dispatch(setStatus('undefinedError'));
      });
  }, [auth.userName, dispatch, auth, t]);

  if (loadingStatus === null) {
    return null;
  }

  const handleRefresh = () => window.location.reload();
  const Component = uiState[loadingStatus];

  return (
    Component ? <Component /> : (
      <div className="text-center">
        <img
          alt={t('dataLoadFail')}
          className="img-fluid h-25"
          src={errorImage}
        />
        <h1 className="h4 text-muted">{t('dataLoadFail')}</h1>
        <p className="text-muted">
          {t('refreshMsg1')}
          {' '}
          <Link to="/" onClick={handleRefresh}>
            {t('refreshMsg2')}
          </Link>
        </p>
      </div>
    )
  );
};

export default ChatPage;
