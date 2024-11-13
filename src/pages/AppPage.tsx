import { Outlet } from "react-router-dom";
import { UserSidebar } from "../components/Bar/UserSidebar";
import { ProfileContainer } from "../components/profile/ProfileContainer";
import { useContext, useEffect } from "react";
import { useFriendRequestReceived } from "../utils/hooks/sockets/useFriendRequestReceived";
import { SocketContext } from "../utils/context/SocketContext";
import { FriendRequest, AcceptFriendRequestResponse } from "../utils/types";
import { useToast } from "../utils/hooks/useToast";
import useProfileStore from "../store/ProfileStore";
import useFriendStore from "../store/friendStore";

export const AppPage = () => {
  const profile = useProfileStore((state) => state.open);
  const socket = useContext(SocketContext);
  const { info } = useToast({ theme: "dark", position: "bottom-left" });
  const { removeFriendRequest, addFriend } = useFriendStore();

  useEffect(() => {
    socket.on("onFriendRequestCancelled", (payload: FriendRequest) => {
      removeFriendRequest(payload);
    });

    socket.on(
      "onFriendRequestAccepted",
      (payload: AcceptFriendRequestResponse) => {
        removeFriendRequest(payload.friendRequest);
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`
        );
        addFriend(payload.friend);
      }
    );
    socket.on("onFriendRequestRejected", (payload: FriendRequest) => {
      removeFriendRequest(payload);
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
