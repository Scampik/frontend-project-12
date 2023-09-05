import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { getChannels } from '../../slices/channelsSlice.js';
import { loadingSelector, setStatus } from '../../slices/loadingSlice.js';
import { getAuthHeader, useAuth } from '../../context/AuthContext.jsx';
import SpinnerForm from './components/SpinnerForm.jsx';
import UndefinedErrorForm from './components/undefinedErrorForm.jsx';
import MainForm from './components/MainForm.jsx';

const uiState = {
  loading: SpinnerForm,
  success: MainForm,
  failed: UndefinedErrorForm,
  null: UndefinedErrorForm,
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
          toast.warn(t('toast.networkProblem'));
          return dispatch(setStatus('undefinedError'));
        }
        return dispatch(setStatus('undefinedError'));
      });
  }, [auth.userName, dispatch, auth, t]);

  const Component = uiState[loadingStatus];

  return (
    <Component />
  );
};

export default ChatPage;
