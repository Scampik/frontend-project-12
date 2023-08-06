import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import routes from '../routes.js';

const initialState = {
    posts: []
};

const postsSlice = createSlice({
    name: 'messages',
    initialState,
    redusers: {
        addPosts(state, action) {
            state.posts = action.payload
        }

    }
});

export default postsSlice.reduser;
export const { action } = postsSlice;