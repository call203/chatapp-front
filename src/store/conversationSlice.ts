import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  ConversationLastMessageUpdate,
  ConversationType,
  CreateConversationParams,
  MessageLastReads,
  UpdateMessageReadParams
} from "../utils/types";
import { getConversations, postNewConversation } from "../utils/api";
import { RootState } from ".";

interface ConversationState {
  conversations: ConversationType[];
  messageLastReads: MessageLastReads[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  messageLastReads: [],
  loading: false
};

export const fetchConversationThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  }
);

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversations.unshift(action.payload);
    },

    updateMessageLastReads: (
      state,
      action: PayloadAction<UpdateMessageReadParams>
    ) => {
      const { conversationId, userId, messageId, read } = action.payload;

      const lastMessageIdx = state.messageLastReads.findIndex((i) =>
        i.conversationId === conversationId && read
          ? userId === i.userId
          : userId !== i.userId
      );
      state.messageLastReads[lastMessageIdx].lastMessageId = messageId;
    },

    setConversationLastMessage: (
      state,
      action: PayloadAction<ConversationLastMessageUpdate>
    ) => {
      const index = state.conversations.findIndex(
        (c) => c.id === action.payload.id
      );

      if (index !== -1) {
        const conversation = state.conversations[index];
        if (conversation.lastMessageSent) {
          conversation.lastMessageSent.content = action.payload.content;
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationThunk.fulfilled, (state, action) => {
        const conversations = action.payload.data;
        state.conversations = conversations;
        state.messageLastReads = [];
        for (let i = 0; i < conversations.length; i++) {
          const lastMessage = conversations[i].messageLastReads;
          lastMessage.forEach((item: MessageLastReads) => {
            state.messageLastReads.push(item);
          });
        }

        state.loading = false;
      })
      .addCase(fetchConversationThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.conversations.unshift(action.payload.data);
      });
  }
});
const selectedConversations = (state: RootState) =>
  state.conversation.conversations;
const selectedConversationsId = (state: RootState, id: number) => id;
export const selectConversationById = createSelector(
  [selectedConversations, selectedConversationsId],
  (conversations, conversationId) =>
    conversations.find((c) => c.id === conversationId)
);

export const {
  addConversation,
  setConversationLastMessage,
  updateMessageLastReads
} = conversationSlice.actions;
export default conversationSlice.reducer;
