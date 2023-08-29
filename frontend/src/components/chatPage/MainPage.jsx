import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import ChannelForm from './components/ChannelForm.jsx';
import ChatForm from './components/ChatForm.jsx';
import { getChannels, selectors } from '../../slices/channelsSlice.js';
import { getAuthHeader, useAuth } from '../../context/AuthContext.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectors.selectAll);
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const authHeader = getAuthHeader(auth.userName);
    dispatch(getChannels(authHeader))
    .then(unwrapResult)
    .catch((rejected) => {
      console.log('error__',rejected)
      if (rejected.message === 'Request failed with status code 401') {
        auth.logOut()
      } else {
        toast.warn(t('toast.networkProblem'));
      }
    })
  }, [auth.userName, dispatch, auth, t]);

  return (
    <>
      { data.length === 0 ? (
        <div className="d-flex justify-content-center h-100 align-items-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelForm />
            <ChatForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
