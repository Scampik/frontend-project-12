import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import routes from '../routes.js'

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'))
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` }
  }
  return {}
}

export const getChannels = createAsyncThunk(
  'channels/getChannels',
  async () => {
    const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() })
    const result = data.channels
    // console.log(result)
    return result
  }
)

const channelsAdapter = createEntityAdapter()

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannel: { id: 1, name: 'general' }
  }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannel (state, { payload }) {
      // console.log(payload,'payload')
      state.currentChannel = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, () => {
        console.log('fetching data')
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        console.log('fetched data successfully!')
        channelsAdapter.addMany(state, action)
        return action.payload.result
      })
      .addCase(getChannels.rejected, () => {
        console.log('failed')
      })
  }
})


export default channelsSlice.reducer
export const selectors = channelsAdapter.getSelectors((state) => state.channels)
export const { actions } = channelsSlice
