import { useEffect } from "react";
import { FriendRequestItem } from "./FriendRequestItem";
import useFriendStore from "../../store/friendStore";
import { useQuery } from "react-query";
import { getRequestFriend } from "../../utils/apis/apis";

export const FriendRequestList = () => {
  const { friendRequests } = useFriendStore();
  const { refetch } = useQuery(["friendRequests"], () => getRequestFriend(), {
    enabled: false
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {friendRequests.length === 0 ? (
        <div className="p-5">No friend requests :(</div>
      ) : (
        friendRequests.map((i, idx) => {
          return (
            <>
              <FriendRequestItem friendRequestDetail={i} key={idx} />
            </>
          );
        })
      )}
    </div>
  );
};
