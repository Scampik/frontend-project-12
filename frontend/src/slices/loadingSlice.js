/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { getChannels } from './channelsSlice.js';

const initialState = {
  loadingStatus: null,
  messageError: null,
  typeError: null,
};

const loadingSlice = createSlice({
  name: 'loadingInfo',
  initialState,
  reducers: {
    setStatus(state, { payload }) {
      state.loadingStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.messageError = null;
        state.typeError = null;
      })
      .addCase(getChannels.fulfilled, (state) => {
        state.loadingStatus = 'success';
        state.messageError = null;
        state.typeError = null;
      })
      .addCase(getChannels.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.messageError = payload.message;
        state.typeError = payload.status;
      });
  },
});

export const selector = (state) => state.loadingInfo;
export const loadingSelector = createSelector(
  selector,
  (loadingInfo) => loadingInfo,
);
export default loadingSlice.reducer;
export const { setStatus } = loadingSlice.actions;
