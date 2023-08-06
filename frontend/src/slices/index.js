import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import messageReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
 
export default configureStore({
    reducer: {  
        channels: channelsReducer,
        message: messageReducer,
        user: userReducer,
    }
});