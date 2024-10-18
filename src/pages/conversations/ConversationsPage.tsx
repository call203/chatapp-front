import { Outlet, useParams } from "react-router-dom";
import { ConversationSideBar } from "../../components/conversation/ConversationSidebar";
import { useContext, useEffect } from "react";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  addConversation,
  fetchConversationThunk,
  updateMessageLastReads
} from "../../store/conversationSlice";
import { useSelector } from "react-redux";
import { addMessage, fetchMessagesThunk } from "../../store/messageSlice";
import { socket } from "../../utils/context/SocketContext";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import { AuthContext } from "../../utils/context/AuthContext";

export const ConversationPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const conversationStataus = useSelector(
    (state: RootState) => state.conversation
  );
  const messages = useSelector((state: RootState) => state.message.messages);

  useEffect(() => {
    dispatch(fetchConversationThunk());
  }, []);

  useEffect(() => {
    let conversations = conversationStataus.conversations;
    if (messages.length == 0 && conversations.length > 0) {
      for (let i = 0; i < conversations.length; i++) {
        const coversationId = conversations[i].id;
        dispatch(fetchMessagesThunk(coversationId));
      }
    }
  }, [conversationStataus.conversations]);

  useEffect(() => {
    if (id) {
      const conversationId = parseInt(id);
      dispatch(fetchMessagesThunk(conversationId));

      const conversation = conversationStataus.conversations.find(
        (i) => i.id === conversationId
      );

      if (user && conversation) {
        let unreadMessage = conversation.messageLastReads.filter(
          (i) => i.conversationId === conversationId
        );

        dispatch(
          updateMessageLastReads({
            conversationId: Number(id),
            userId: user.id,
            messageId:
              unreadMessage.length === 2
                ? Math.max(
                    unreadMessage[0].lastMessageId,
                    unreadMessage[1].lastMessageId
                  )
                : unreadMessage[0].lastMessageId,
            read: true
          })
        );
      }
    }
  }, [id]);

  useEffect(() => {
    const conversationId = id!;
    socket.on("connected", (data) => {
      console.log("Connected to Websocket");
    });

    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, message } = payload;

      if (!user) return;
      //update the last read message
      if (conversation.id === Number(id)) {
        socket.emit("readMessage", {
          user: user,
          conversation: conversation,
          message: message
        });
        dispatch(
          updateMessageLastReads({
            conversationId: conversation.id,
            userId: user.id,
            messageId: message.id,
            read: true
          })
        );
      } else {
        dispatch(
          updateMessageLastReads({
            conversationId: conversation.id,
            userId: user.id,
            messageId: message.id,
            read: false
          })
        );
      }

      dispatch(addMessage(payload));
    });

    socket.on("onConversation", (payload: ConversationType) => {
      console.log("Conversation Event");
      console.log(payload);
      dispatch(addConversation(payload));
    });

    socket.emit("onConversationJoin", { conversationId });

    return () => {
      socket.off("connected");
      socket.off("onConversation");
      socket.off("onMessage");
    };
  }, [id]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-y-auto">
        <ConversationSideBar
          conversations={conversationStataus.conversations}
          loading={conversationStataus.loading}
        />
        <div className="flex-1">
          {!id && <ConversationPanel />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
