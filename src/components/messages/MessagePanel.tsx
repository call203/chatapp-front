import React, { FC, useEffect, useState } from "react";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { useParams } from "react-router-dom";
import { MessageContainer } from "./MessageContainer";
import { postNewMessage } from "../../utils/api";
import { setConversationLastMessage } from "../../store/conversationSlice";
import { useDispatch } from "react-redux";

type Props = {};

export const MesasgePanel: FC<Props> = ({}) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !content) return;
    const conversationId = Number(id);
    try {
      await postNewMessage({ conversationId, content });
      updateLastMessage();
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  const updateLastMessage = () => {
    dispatch(setConversationLastMessage({ id: Number(id), content }));
  };

  return (
    <div className="flex flex-col h-full">
      <MessagePanelHeader />

      <div
        className="overflow-y-auto flex flex-col-reverse no-scrollbar flex-1 px-5 "
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        <MessageContainer />
      </div>
      <div className="fixed bottom-0 w-full">
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
