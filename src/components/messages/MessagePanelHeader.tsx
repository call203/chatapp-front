import { useParams } from "react-router-dom";
import { getRecipientFromConversation } from "../../utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import DefaultProfile from "../../Assets/DefaultProfile.png";
import useProfileStore from "../../store/ProfileStore";
import { selectConversationById } from "../../store/conversationSlice";

export const MessagePanelHeader = () => {
  const { id } = useParams();
  const user = useContext(AuthContext).user!;
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, Number(id))
  );
  const recipient = getRecipientFromConversation(conversation, user);
  const { toggleProfile, setProfileInfo } = useProfileStore();

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
