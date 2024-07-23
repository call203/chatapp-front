import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConversationType, CreateConversationParams } from '../utils/types'
import { getConversations, postNewConversation } from '../utils/api'

interface ConversationState {
  conversations: ConversationType[]
  loading: boolean
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
}

export const fetchConversationThunk = createAsyncThunk(
  'conversations/fetch',
  async () => {
    return getConversations()
  },
)

export const createConversationThunk = createAsyncThunk(
  'conversations/create',
  async (data: CreateConversationParams) => {
    return postNewConversation(data)
  },
)

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data
        state.loading = false
      })
      .addCase(fetchConversationThunk.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.conversations.unshift(action.payload.data)
      })
  },
})
export const { addConversation } = conversationSlice.actions
export default conversationSlice.reducer
