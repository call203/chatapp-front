import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Friend } from '../utils/types'
import { getFriends } from '../utils/api'

interface friendState {
  friends: Friend[]
}

const initialState: friendState = {
  friends: [],
}

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', async () => {
  return getFriends()
})

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      state.friends = action.payload.data
    })
  },
})

export const {} = friendSlice.actions
export default friendSlice.reducer
