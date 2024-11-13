import { useContext, useEffect, useState } from "react";
import DefaultProfile from "../../Assets/DefaultProfile.png";
import { Friend } from "../../utils/types";
import { AuthContext } from "../../utils/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getFriends, postNewConversation } from "../../utils/apis/apis";
import useConversationStore from "../../store/conversationStore";
import useFriendStore from "../../store/friendStore";

export const FriendList = () => {
  const { user } = useContext(AuthContext);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const { friends, fetchFriends } = useFriendStore();
  const navigate = useNavigate();
  const { addConversation } = useConversationStore();
  const { mutate: mutateNewConversation } = useMutation(postNewConversation, {
    onSuccess: (response) => {
      navigate(`/conversations/${response.data.id}`);
      addConversation(response.data);
    },
    onError: (err) => {
      console.log(err);
    }
  });
  const { refetch } = useQuery(["friends"], () => getFriends(), {
    enabled: false,
    onSuccess: (res) => {
      fetchFriends(res.data);
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  const filterFriend = (data: Friend) => {
    return data.sender.email === user?.email ? data.receiver : data.sender;
  };

  const createConversation = (email: string) => {
    const data = { email: email };
    mutateNewConversation(data);
  };

  return (
    <>
      {friends.length === 0 ? (
        <div className="p-5">Add your friends!</div>
      ) : (
        friends.map((i, idx) => {
          return (
            <>
              <li
                className={`flex flex-row py-4  items-center ${
                  overIdx === idx ? "bg-slate-900" : "bg-transparent"
                }`}
                onMouseDown={() => setOverIdx(idx)}
                onMouseUp={() => setOverIdx(null)}
                style={{ cursor: "pointer" }}
                onClick={() => createConversation(filterFriend(i).email)}
              >
                <img
                  className="w-11 h-11 mr-8 rounded-full"
                  src={
                    filterFriend(i).profile.image
                      ? filterFriend(i).profile.image
                      : DefaultProfile
                  }
                />
                <div className="flex flex-col">
                  <div>{filterFriend(i).email}</div>
                  <div className="text-gray-400 text-sm mt-1">
                    {filterFriend(i).profile.about}
                  </div>
                </div>
              </li>
            </>
          );
        })
      )}
    </>
  );
};
