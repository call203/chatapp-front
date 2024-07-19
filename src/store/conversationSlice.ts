import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConversationType } from '../utils/types'
import { getConversations } from '../utils/api'
import { create } from 'domain'

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

export const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      const conversation = action.payload
      const index = state.conversations.findIndex(
        (i) => i.id === conversation.id,
      )
      state.conversations.splice(index, 1)
      state.conversations.unshift()
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
  },
})

export const { addConversation } = conversationSlice.actions
export default conversationSlice.reducer
