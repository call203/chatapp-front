import { useParams } from "react-router-dom";
import { getRecipientFromConversation } from "../../utils/helper";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import DefaultProfile from "../../Assets/DefaultProfile.png";
import useProfileStore from "../../store/ProfileStore";
import useConversationStore from "../../store/conversationStore";
import { User } from "../../utils/types";

export const MessagePanelHeader = () => {
  const { id } = useParams();
  const user = useContext(AuthContext).user!;
  const { selectConversationById } = useConversationStore();
  const [recipient, setRecipient] = useState<User | undefined>();
  const { toggleProfile, setProfileInfo } = useProfileStore();

  useEffect(() => {
    if (id) {
      const conversation = selectConversationById(Number(id));
      const recipientData = getRecipientFromConversation(conversation, user);
      setRecipient(recipientData);
      console.log(recipientData);
    }
  }, [id]);

  const handleProfile = () => {
    if (recipient) {
      toggleProfile();
      setProfileInfo(recipient);
    }
  };

  return (
    <div className="bg-b_131313 flex items-center py-3 px-5 text-white">
      <img
        src={
          recipient?.profile.image ? recipient?.profile.image : DefaultProfile
        }
        className="w-11 h-11  rounded-full mr-5"
        onClick={handleProfile}
      />
      <div>
        {recipient?.firstName} {recipient?.lastName}
      </div>
    </div>
  );
};
