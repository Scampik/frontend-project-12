import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import routes from '../routes.js';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesAdapter.getInitialState(),
    reducers: {
        addMessages: messagesAdapter.addMany,
        addMessage: messagesAdapter.addOne,
        removeMessage: messagesAdapter.removeOne,
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase()
    // }
});

export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;