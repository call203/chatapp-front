import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Friend, FriendRequest, RequestFriendParams } from '../utils/types'
import {
  deletecancelRequestFriend,
  getFriends,
  getRequestFriend,
  patchAcceptRequestFriend,
  patchRejectRequestFriend,
  postRequestFriend,
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
export const createFriendRequestThunk = createAsyncThunk(
  'friends/request/create',
  async (data: RequestFriendParams) => postRequestFriend(data),
)

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests.push(action.payload)
    },
    removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests = state.friendRequests.filter(
        (i) => action.payload.id !== i.id,
      )
    },
    addFriend: (state, action: PayloadAction<Friend>) => {
      state.friends.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      state.friends = action.payload.data
    })
    builder.addCase(fetchFriendsRequestThunk.fulfilled, (state, action) => {
      state.friendRequests = action.payload.data
    })
    builder.addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data.friendRequest
      state.friendRequests = state.friendRequests.filter((i) => i.id != id)
      state.friends.push(action.payload.data.friend)
    })
    builder.addCase(createFriendRequestThunk.fulfilled, (state, action) => {
      state.friendRequests.push(action.payload.data)
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

export const {
  addFriendRequest,
  removeFriendRequest,
  addFriend,
} = friendSlice.actions
export default friendSlice.reducer
