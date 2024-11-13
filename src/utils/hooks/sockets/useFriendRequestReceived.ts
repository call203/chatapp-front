import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { FriendRequest } from "../../types";
import { useToast } from "../useToast";
import useFriendStore from "../../../store/friendStore";
import { useQuery } from "react-query";
import { getRequestFriend } from "../../apis/apis";

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext);
  const { fetchFriendRequests, addFriendRequest } = useFriendStore();

  const { info } = useToast({ theme: "dark", position: "bottom-left" });
  const { refetch } = useQuery(["friendRequests"], () => getRequestFriend(), {
    enabled: false,
    onSuccess: (res) => {
      fetchFriendRequests(res.data);
    }
  });

  useEffect(() => {
    refetch();
    socket.on("onFriendRequestReceived", (payload: FriendRequest) => {
      addFriendRequest(payload);
      info(`Incoming Friend Request from ${payload.sender.firstName}`);
    });
  }, []);

  return () => {
    socket.off("onFriendRequestReceived");
  };
}
