import { createSlice } from '@reduxjs/toolkit';

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