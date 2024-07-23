import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConversationMessagesType, MessageEventPayload } from '../utils/types'
import { create } from 'domain'
import { getConversationMessages } from '../utils/api'

interface MessageState {
  messages: ConversationMessagesType[]
  loading: boolean
}

const initialState: MessageState = {
  messages: [],
  loading: false,
}

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetch',
  (id: number) => {
    return getConversationMessages(id)
  },
)

export const messageSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload
      const conversationMessage = state.messages.find(
        (cm) => cm.conversationId === conversation.id,
      )
      conversationMessage?.messages.unshift(message)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { conversationId, messages } = action.payload.data
      const index = state.messages.findIndex(
        (cm) => cm.conversationId === parseInt(conversationId),
      )

      if (index !== -1) {
        state.messages[index] = action.payload.data
      } else {
        state.messages.push(action.payload.data)
      }
      state.loading = false
    })
    builder.addCase(fetchMessagesThunk.pending, (state, action) => {
      state.loading = true
    })
  },
})
export const { addMessage } = messageSlice.actions
export default messageSlice.reducer
