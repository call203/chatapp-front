import { Outlet } from "react-router-dom";
import { UserSidebar } from "../components/Bar/UserSidebar";
import { ProfileContainer } from "../components/profile/ProfileContainer";
import { useContext, useEffect } from "react";
import { AppDispatch } from "../store";
import { useFriendRequestReceived } from "../utils/hooks/sockets/useFriendRequestReceived";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch } from "react-redux";
import { addFriend, removeFriendRequest } from "../store/friendSlice";
import { FriendRequest, AcceptFriendRequestResponse } from "../utils/types";
import { useToast } from "../utils/hooks/useToast";
import useProfileStore from "../store/ProfileStore";

export const AppPage = () => {
  const profile = useProfileStore((state) => state.open);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { info } = useToast({ theme: "dark", position: "bottom-left" });

  useEffect(() => {
    socket.on("onFriendRequestCancelled", (payload: FriendRequest) => {
      dispatch(removeFriendRequest(payload));
    });

    socket.on(
      "onFriendRequestAccepted",
      (payload: AcceptFriendRequestResponse) => {
        dispatch(removeFriendRequest(payload.friendRequest));
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`
        );
        dispatch(addFriend(payload.friend));
      }
    );
    socket.on("onFriendRequestRejected", (payload: FriendRequest) => {
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.off("onFriendRequestCancelled");
      socket.off("onFriendRequestRejected");
      socket.off("onFriendRequestReceived");
      socket.off("onFriendRequestAccepted");
    };
  }, [socket]);

  useFriendRequestReceived();
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-y-auto flex-col md:flex-row ">
        <UserSidebar />
        <div className="flex-1">
          {profile && <ProfileContainer />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
