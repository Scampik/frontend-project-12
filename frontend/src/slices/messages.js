import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: []
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    redusers: {
        addMessages(state, action) {
            state.messages = action.payload
        }

    }
});

export default messagesSlice.reduser;
export const { action } = messagesSlice.action;