import { FC, useContext } from "react";
import { ConversationType } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { CreateConversationModal } from "../Modal/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";
import { Loading } from "../loading";
import { MainButton } from "../MainButton";
import defaultImg from "../../Assets/DefaultProfile.png";
import searchImg from "../../Assets/Search.png";
import { useDisclosure } from "@chakra-ui/react";

type Props = {
  conversations: ConversationType[];
  loading: Boolean;
};
export const ConversationSideBar: FC<Props> = ({ conversations, loading }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id
      ? conversation.recipient
      : conversation.creator;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <CreateConversationModal isOpen={isOpen} onClose={onClose} />
      <div className="w-80 flex flex-col bg-background_dark2 py-10 px-5">
        <div className="flex flex-col">
          {/** Conversation Search Input */}
          <div className="flex flex-row justify-center items-center bg-black">
            <input
              style={{ border: "none", outline: "none" }}
              placeholder="Search Chat"
              className="bg-black h-12 rounded-md py-4 pl-5 w-full"
            />
            <div className="px-4">
              <img src={searchImg} className="w-6 h-5" alt="search" />
            </div>
          </div>
          {/** Create Conversation Button */}
          <div className="py-6" onClick={onOpen}>
            <MainButton>Start new Chat</MainButton>
          </div>
        </div>

        <div className="overflow-y-auto flex-grow">
          {loading && <Loading />}
          {/** Conversations */}
          {conversations.map((conversation) => {
            return (
              <>
                <div
                  className="overflow-y-auto py-4"
                  key={conversation.id}
                  onClick={() => navigate(`/conversations/${conversation.id}`)}
                >
                  <div className="flex align-middle items-center">
                    <img
                      src={
                        getDisplayUser(conversation)?.profile.image
                          ? getDisplayUser(conversation).profile.image
                          : defaultImg
                      }
                      className="w-10 h-10 rounded-full"
                      alt="conversation-profile"
                    />
                    <div className="ml-5">
                      <div className="text-sm font-semibold">
                        {`${getDisplayUser(conversation).firstName}`}
                        {`  ${getDisplayUser(conversation).lastName}`}
                      </div>
                      <div className="text-sm text-gray-300 ">
                        {conversation.lastMessageSent?.content}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
