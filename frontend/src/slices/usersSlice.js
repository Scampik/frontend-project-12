import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import routes from '../routes.js';

const usersAdapters = createEntityAdapter();

const usersSlice = createSlice({
    name: 'messages',
    initialState: usersAdapters.getInitialState(),
    reducers: {
        addUsers: usersAdapters.addMany,
        addUser: usersAdapters.addOne,
        removeUser: usersAdapters.removeOne,
    }
});

export default usersSlice.reducer;
export const selectors = usersAdapters.getSelectors((state) => state.users);
export const { action } = usersSlice;