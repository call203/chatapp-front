import { FC, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { getFriendRequestDetails } from "../../utils/helper";
import { FriendRequest } from "../../utils/types";
import DefaultProfile from "../../Assets/DefaultProfile.png";
import { FriendRequestIcon } from "./FriendRequestIcon";

import { useMutation } from "react-query";
import {
  deletecancelRequestFriend,
  patchAcceptRequestFriend,
  patchRejectRequestFriend
} from "../../utils/apis/apis";
import useFriendStore from "../../store/friendStore";

type Props = {
  friendRequestDetail: FriendRequest;
};
export const FriendRequestItem: FC<Props> = ({ friendRequestDetail }) => {
  const { user } = useContext(AuthContext);
  const friendDetail = getFriendRequestDetails(friendRequestDetail, user);
  const { removeFriendRequest, addFriend } = useFriendStore();
  const { mutate: acceptFriendRequestMutation } = useMutation(
    patchAcceptRequestFriend,
    {
      onSuccess: (res) => {
        removeFriendRequest(res.data.friendRequest);
        addFriend(res.data.friend);
      }
    }
  );
  const { mutate: rejectFriendReqeuest } = useMutation(
    patchRejectRequestFriend,
    {
      onSuccess: (res) => {
        removeFriendRequest(res.data);
      }
    }
  );
  const { mutate: cancelFriendRequest } = useMutation(
    deletecancelRequestFriend,
    {
      onSuccess: (res) => {
        removeFriendRequest(res.data);
      }
    }
  );

  const handleFriendRequest = (type?: string) => {
    const { id } = friendRequestDetail;
    switch (type) {
      case "accept":
        return acceptFriendRequestMutation(id);
      case "reject":
        return rejectFriendReqeuest(id);
      default:
        return cancelFriendRequest(id);
    }
  };

  return (
    <>
      <li className="flex flex-row  py-4 justify-between pr-5">
        <div className="flex flex-row item-center items-center">
          <img
            src={
              friendDetail.user.profile?.image
                ? friendDetail.user.profile?.image
                : DefaultProfile
            }
            className="w-11 h-11 mr-8 rounded-full"
          />

          <div className="flex flex-col">
            <div>
              {friendDetail.user.firstName} {friendDetail.user.lastName}
            </div>
            <div className="text-gray-400 text-sm mt-1 md:text-base text-xsm">
              {friendDetail.status}
            </div>
          </div>
        </div>

        <div className="flex">
          <FriendRequestIcon
            incoming={friendDetail.incoming}
            handleFriendRequest={handleFriendRequest}
          />
        </div>
      </li>
    </>
  );
};
