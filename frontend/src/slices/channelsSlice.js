import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import routes from "../routes.js";
import { actions as messagesActions } from "./messagesSlice.js";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const getChannels = createAsyncThunk(
  "channels/getChannels",
  async () => {
    const { data } = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return data;
  }
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: "channels",
  initialState: channelsAdapter.getInitialState({
    currentChannel: { id: 1, name: "general", removable: false },
  }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, () => {
        console.log("fetching data");
      })
      .addCase(getChannels.fulfilled, (state, { payload }) => {
        console.log("fetched data successfully!{channels}");
        const { channels } = payload;
        channelsAdapter.setMany(state, channels);
      })
      .addCase(getChannels.rejected, () => {
        console.log("failed");
      });
  },
});

export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export const { actions } = channelsSlice;
