import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalsSlice';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modalInfo: modalReducer,
    loadingInfo: loadingReducer,
  },
});
