import { useContext, useEffect, useState } from 'react'
import { fetchFriendsThunk } from '../../store/friendSlice'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useDispatch } from 'react-redux'
import DefaultProfile from '../../Assets/DefaultProfile.png'
import { Friend } from '../../utils/types'
import { AuthContext } from '../../utils/context/AuthContext'
import { createConversationThunk } from '../../store/conversationSlice'
import { useNavigate } from 'react-router-dom'

export const FriendList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useContext(AuthContext)
  const friends = useSelector((state: RootState) => state.friend).friends
  const [overIdx, setOverIdx] = useState<number | null>(null)
  const [clickEmail, setClickEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchFriendsThunk())
  }, [])

  const filterFriend = (data: Friend) => {
    return data.sender.email === user?.email ? data.receiver : data.sender
  }

  const createConversation = (email: string) => {
    const data = { email: email }
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        navigate(`/conversations/${data.id}`)
      })
      .catch((err) => console.log(err))
  }

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
                  overIdx === idx ? 'bg-slate-900' : 'bg-transparent'
                }`}
                onMouseDown={() => setOverIdx(idx)}
                onMouseUp={() => setOverIdx(null)}
                style={{ cursor: 'pointer' }}
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
          )
        })
      )}
    </>
  )
}
