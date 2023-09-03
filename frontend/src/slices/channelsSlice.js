/* eslint-disable no-param-reassign */

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from 'reselect';

import routes from '../routes.js';

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (authHeader) => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: authHeader,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannel: { id: 1},
  }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel(state, action) {
      channelsAdapter.removeOne(state, action);
      if (state.currentChannel.id === action.payload) {
        state.currentChannel = { id: 1};
      }
    },
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, () => {
        console.log('fetching data');
      })
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        console.log('fetched data successfully!{channels}');
        const { channels } = payload;
        channelsAdapter.setMany(state, channels);
      })
      .addCase(getChannels.rejected, () => {
        console.log('failed');
      });
  },
});

export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const currenIdChannel = (state) => state.channels.currentChannel.id;
export const channelIdSelector = createSelector(
  currenIdChannel,
  (id) => id,
);
export const channelNameSelector = createSelector(
  selectors.selectAll,
  channelIdSelector,
  (channels, id) => {
    const channel = channels.find((el) => el.id === id);
    if (channel !== undefined) {
      return channel.name;
    }
    return null;
  },
);
export const { actions } = channelsSlice;
