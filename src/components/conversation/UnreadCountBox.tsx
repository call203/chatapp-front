// export const UnreadCountBox = () => {
//   return <></>;
// };
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {
  conversationId: number;
  userId: number;
};
export const UnreadCountBox: FC<Props> = ({ conversationId, userId }) => {
  const messagesState = useSelector(
    (state: RootState) => state.message
  ).messages;
  const [unreadCount, setUnreadCount] = useState(0);
  const messageLastReads = useSelector(
    (state: RootState) => state.conversation
  ).messageLastReads;

  useEffect(() => {
    console.log("hi");
    const lastReadMessageId = messageLastReads.find(
      (i) => i.userId === userId && conversationId === i.conversationId
    )?.lastMessageId;

    const messages = messagesState.find(
      (i) => i.conversationId === conversationId
    );
    if (lastReadMessageId) {
      console.log("pass1");
      const unreadMessages = messages?.messages.filter(
        (i) => lastReadMessageId < i.id
      );

      if (unreadMessages) {
        console.log("pass2");
        setUnreadCount(unreadMessages?.length);
      }
    }
  }, [messageLastReads, messagesState]);

  return unreadCount > 0 ? (
    <div className="py-1 px-2 bg-my_blue text-center rounded-full text-xxsm font-semibold">
      {unreadCount}
    </div>
  ) : (
    <></>
  );
};
