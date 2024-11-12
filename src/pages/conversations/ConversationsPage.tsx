import { Outlet, useParams } from "react-router-dom";
import { ConversationSideBar } from "../../components/conversation/ConversationSidebar";
import { useCallback, useEffect, useMemo } from "react";
import { ConversationPanel } from "../../components/conversation/ConversationPanel";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { socket } from "../../utils/context/SocketContext";
import { ConversationType, MessageEventPayload } from "../../utils/types";
import { useQuery } from "react-query";
import { getConversationMessages } from "../../utils/apis/apis";
import {
  addConversation,
  fetchConversationThunk
} from "../../store/conversationSlice";
import useMessageStore from "../../store/messageStore";

export const ConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector((state: RootState) => state.conversation);
  const { setMessages, addMessage } = useMessageStore();
  const fetchMessages = useCallback(
    () => getConversationMessages(Number(id)),
    [id]
  );
  const { data, isLoading } = useQuery(
    ["messages", id],
    () => fetchMessages(),
    {
      enabled: !!id,
      cacheTime: 1000 * 60 * 5 // 5 minutes
    }
  );

  useEffect(() => {
    if (data) {
      setMessages(data.data);
    }
  }, [data, setMessages]);

  useEffect(() => {
    dispatch(fetchConversationThunk());
  }, []);

  const memoizedConverseations = useMemo(
    () => conversations.conversations,
    [conversations.conversations]
  );

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
          conversations={memoizedConverseations}
          loading={isLoading}
        />
        <div className="flex-1">
          {!id && <ConversationPanel />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
