import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: []
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    redusers: {
        addChannels(state, action) {
            state.channels = action.payload
        }

    }
});

export default channelsSlice.reduser;
export const { action } = channelsSlice.action;