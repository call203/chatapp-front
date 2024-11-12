import { useEffect, useState } from "react";
import { MesasgePanel } from "../../components/messages/MessagePanel";

import { useParams } from "react-router-dom";
import { socket } from "../../utils/context/SocketContext";
import { ProfileContainer } from "../../components/profile/ProfileContainer";

export const ConversationChannelPage = () => {
  const { id } = useParams();

  useEffect(() => {
    const conversationId = id!;
    socket.emit("onConversationJoin", { conversationId });
    socket.on("userJoin", () => {
      console.log("userJoin");
    });
    socket.on("userLeave", () => {
      console.log("userLeave");
    });

    return () => {
      socket.emit("onConversationLeave", { conversationId });
      socket.off("userJoin");
      socket.off("userLeave");
    };
  }, [id]);

  const [profile, setProfile] = useState(false);

  return (
    <>
      {profile && <ProfileContainer />}
      <MesasgePanel />
    </>
  );
};
