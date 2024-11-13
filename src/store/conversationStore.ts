import { create } from "zustand";
import {
  ConversationLastMessageUpdate,
  ConversationType
} from "../utils/types";

interface ConversationState {
  conversations: ConversationType[];
  fetchConversation: (payload: ConversationType[]) => void;
  addConversation: (payload: ConversationType) => void;
  setConversationLastMessage: (payload: ConversationLastMessageUpdate) => void;
  selectConversationById: (
    conversationId: number
  ) => ConversationType | undefined;
}

const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  fetchConversation: (conversations) => set({ conversations }),
  setConversationLastMessage: (payload: ConversationLastMessageUpdate) => {
    set((state) => {
      const updatedConversations = state.conversations.map((conversation) =>
        conversation.id === payload.id && conversation.lastMessageSent
          ? {
              ...conversation,
              lastMessageSent: {
                ...conversation.lastMessageSent,
                content: payload.content
              }
            }
          : conversation
      );

      return { conversations: updatedConversations };
    });
  },
  addConversation: (payload: ConversationType) => {
    set((state) => {
      const updatedConversations = [payload, ...state.conversations];
      return { conversations: updatedConversations };
    });
  },

  selectConversationById: (conversationId: number) =>
    get().conversations.find((c) => c.id === conversationId)
}));

export default useConversationStore;

//REDUX
// import {
//   createAsyncThunk,
//   createSelector,
//   createSlice,
//   PayloadAction
// } from "@reduxjs/toolkit";
// import {
//   ConversationLastMessageUpdate,
//   ConversationType,
//   CreateConversationParams
// } from "../utils/types";
// import { getConversations, postNewConversation } from "../utils/apis/apis";
// import { RootState } from ".";

// interface ConversationState {
//   conversations: ConversationType[];
//   loading: boolean;
// }

// const initialState: ConversationState = {
//   conversations: [],
//   loading: false
// };

// export const fetchConversationThunk = createAsyncThunk(
//   "conversations/fetch",
//   async () => {
//     return getConversations();
//   }
// );

// export const createConversationThunk = createAsyncThunk(
//   "conversations/create",
//   async (data: CreateConversationParams) => {
//     return postNewConversation(data);
//   }
// );

// export const conversationSlice = createSlice({
//   name: "conversations",
//   initialState,
//   reducers: {
//     addConversation: (state, action: PayloadAction<ConversationType>) => {
//       state.conversations.unshift(action.payload);
//     },
//     setConversationLastMessage: (
//       state,
//       action: PayloadAction<ConversationLastMessageUpdate>
//     ) => {
//       const index = state.conversations.findIndex(
//         (c) => c.id === action.payload.id
//       );

//       if (index !== -1) {
//         const conversation = state.conversations[index];
//         if (conversation.lastMessageSent) {
//           conversation.lastMessageSent.content = action.payload.content;
//         }
//       }
//     }
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchConversationThunk.fulfilled, (state, action) => {
//         state.conversations = action.payload.data;
//         state.loading = false;
//       })
//       .addCase(fetchConversationThunk.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(createConversationThunk.fulfilled, (state, action) => {
//         console.log(action.payload.data);
//         state.conversations.unshift(action.payload.data);
//       });
//   }
// });
// const selectedConversations = (state: RootState) =>
//   state.conversation.conversations;
// const selectedConversationsId = (state: RootState, id: number) => id;
// export const selectConversationById = createSelector(
//   [selectedConversations, selectedConversationsId],
//   (conversations, conversationId) =>
//     conversations.find((c) => c.id === conversationId)
// );

// export const { addConversation, setConversationLastMessage } =
//   conversationSlice.actions;
// export default conversationSlice.reducer;
