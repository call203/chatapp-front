import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Friend, FriendRequest } from '../utils/types'
import {
  deletecancelRequestFriend,
  getFriends,
  getRequestFriend,
  patchAcceptRequestFriend,
  patchRejectRequestFriend,
} from '../utils/api'

interface friendState {
  friends: Friend[]
  friendRequests: FriendRequest[]
}

const initialState: friendState = {
  friends: [],
  friendRequests: [],
}

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', async () => {
  return getFriends()
})

export const fetchFriendsRequestThunk = createAsyncThunk(
  'freinds/request/fetch',
  async () => {
    return getRequestFriend()
  },
)

export const acceptFriendRequestThunk = createAsyncThunk(
  'friends/request/accept',
  async (id: number) => patchAcceptRequestFriend(id),
)
export const cancelFriendRequestThunk = createAsyncThunk(
  'friends/request/cancel',
  async (id: number) => deletecancelRequestFriend(id),
)
export const rejectFriendRequestThunk = createAsyncThunk(
  'friends/request/reject',
  async (id: number) => patchRejectRequestFriend(id),
)

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      state.friends = action.payload.data
    })
    builder.addCase(fetchFriendsRequestThunk.fulfilled, (state, action) => {
      state.friendRequests = action.payload.data
    })
    builder.addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data
      state.friendRequests = state.friendRequests.filter(
        (data) => data.id != id,
      )
    })
    builder.addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data
      state.friendRequests = state.friendRequests.filter(
        (data) => data.id != id,
      )
    })
    builder.addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data
      state.friendRequests = state.friendRequests.filter(
        (data) => data.id != id,
      )
    })
  },
})

export const {} = friendSlice.actions
export default friendSlice.reducer
