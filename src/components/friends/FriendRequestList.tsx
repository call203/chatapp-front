import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFriendsRequestThunk } from '../../store/friendSlice'
import { AppDispatch, RootState } from '../../store'
import { useSelector } from 'react-redux'

import { FriendRequestItem } from './FriendRequestItem'

export const FriendRequestList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const friendRequest = useSelector(
    (state: RootState) => state.friend.friendRequests,
  )

  useEffect(() => {
    dispatch(fetchFriendsRequestThunk())
  }, [])

  return (
    <div>
      {friendRequest.length === 0 ? (
        <div className="p-5">No friend requests :(</div>
      ) : (
        friendRequest.map((i, idx) => {
          return (
            <>
              <FriendRequestItem friendRequestDetail={i} key={idx} />
            </>
          )
        })
      )}
    </div>
  )
}
