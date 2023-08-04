import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.js';
import messageReduser from '/.messages.js';
import channelsReduser from '/.messages.js';
import postsReduser from '/.posts.js';

export const store = {
    reduser: {
        user: userReducer,
        message: messageReduser,
        posts: postsReduser,
        channels: channelsReduser,
    }
}