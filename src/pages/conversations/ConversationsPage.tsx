import { Outlet, useParams } from "react-router-dom";
import { ConversationSideBar } from "../../components/conversation/ConversationSidebar";
import { useCallback, useEffect, useMemo } from "react";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { socket } from "../../utils/context/SocketContext";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import { useQuery } from "react-query";
import {
  getConversationMessages,
  getConversations
} from "../../utils/apis/apis";
import useMessageStore from "../../store/messageStore";
import useConversationStore from "../../store/conversationStore";

export const ConversationPage = () => {
  const { id } = useParams();
  const { conversations, fetchConversation, addConversation } =
    useConversationStore();
  const { setMessages, addMessage } = useMessageStore();
  const fetchMessages = useCallback(
    () => getConversationMessages(Number(id)),
    [id]
  );

  const { data: conversationsData, isLoading: isLoadingConversations } =
    useQuery(["conversations"], () => getConversations(), {
      cacheTime: 1000 * 60 * 5 // 5 minutes
    });

  const { data: messageData } = useQuery(
    ["messages", id],
    () => fetchMessages(),
    {
      enabled: !!id && !!conversationsData,
      cacheTime: 1000 * 60 * 5 // 5 minutes
    }
  );

  useEffect(() => {
    if (messageData) {
      setMessages(messageData.data);
    }
  }, [messageData, setMessages]);

  useEffect(() => {
    if (conversationsData) {
      fetchConversation(conversationsData.data);
    }
  }, [conversationsData, fetchConversation]);

  const memoizedConverseations = useMemo(() => conversations, [conversations]);

  useEffect(() => {
    const conversationId = id!;
    socket.on("connected", (data) => {
      console.log("Connected to Websocket");
    });

    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, message } = payload;
      addMessage(payload);
      //update the last read message
      // if (conversation.id === Number(id)) {
      //   socket.emit("TEST", {
      //     user: user,
      //     conversation: conversation,
      //     message: message
      //   });
      // }
    });

    socket.on("onConversation", (payload: ConversationType) => {
      console.log("Conversation Event");
      addConversation(payload);
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
          conversations={memoizedConverseations}
          loading={isLoadingConversations}
        />
        <div className="flex-1">
          {!id && <ConversationPanel />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
