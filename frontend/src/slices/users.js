import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Alex',
    age: 12
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    redusers: {
        incriment_age(state, action) {
            state.age += 1;
        }

    }
});

export default usersSlice.reduser;
export const { action } = usersSlice.action;