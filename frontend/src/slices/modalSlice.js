import { createSlice } from '@reduxjs/toolkit'
// import axios from 'axios';
// import routes from '../routes.js';

const initialState = {
  modalStatus: false
}
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    isOpen (state) {
      state.modalStatus = true
    },
    isClose (state) {
      state.modalStatus = false
    }
  }
})

export default modalSlice.reducer
export const { isOpen, isClose } = modalSlice.actions
