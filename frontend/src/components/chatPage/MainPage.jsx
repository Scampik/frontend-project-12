import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Bug } from 'react-bootstrap-icons';
import SpinnerElement from 'react-bootstrap/Spinner';

import { getChannels } from '../../slices/channelsSlice.js';
import { loadingStatusSelector, setStatus } from '../../slices/loadingSlice.js';
import { getAuthHeader, useAuth } from '../../context/AuthContext.jsx';
import ChannelForm from './components/ChannelForm.jsx';
import ChatForm from './components/ChatForm.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const dataFetchStatus = useSelector(loadingStatusSelector);
  const auth = useAuth();
  const { t } = useTranslation();

  console.log(dataFetchStatus);

  useEffect(() => {
    const authHeader = getAuthHeader(auth.userName);
    dispatch(getChannels(authHeader))
      .then(unwrapResult)
      .catch((error) => {
        if (error.status === 4011) {
          return auth.logOut();
        } if (error.status === 0) {
          toast.warn(t('toast.networkProblem'));
          return dispatch(setStatus('failed'));
        }
        return dispatch(setStatus('failed'));
      });
  }, [auth.userName, dispatch, auth, t]);

  const handleRefresh = () => window.location.reload();

  const Spinner = () => (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <SpinnerElement animation="border" variant="info" />
    </div>
  );

  const CommonError = () => (
    <div className="text-center row justify-content-center align-content-center h-100">
      <div className="m-2">
        <Bug size={50} />
      </div>
      <h1 className="h4 text-muted">{t('dataLoadFail')}</h1>
      <p className="text-muted">
        {t('refreshMsg1')}
        {' '}
        <Link to="/" onClick={handleRefresh}>
          {t('refreshMsg2')}
        </Link>
      </p>
    </div>
  );

  const MainElements = () => (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelForm />
        <ChatForm />
      </div>
    </div>
  );

  const loadResultComponent = () => {
    if (dataFetchStatus === 'loading' || dataFetchStatus === null) {
      return <Spinner />;
    }

    if (dataFetchStatus === 'failed') {
      return <CommonError />;
    }

    return <MainElements />;
  };

  return loadResultComponent(dataFetchStatus);
};

export default ChatPage;
