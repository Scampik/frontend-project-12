import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
 
export default configureStore({
    reducer: {  
        channels: channelsReducer,
        messages: messagesReducer,
        users: userReducer,
    }
});