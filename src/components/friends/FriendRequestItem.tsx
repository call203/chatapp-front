import { FC, useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext'
import { getFriendRequestDetails } from '../../utils/helper'
import { FriendRequest } from '../../utils/types'
import DefaultProfile from '../../Assets/DefaultProfile.png'
import { FriendRequestIcon } from './FriendRequestIcon'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk,
} from '../../store/friendSlice'

type Props = {
  friendRequestDetail: FriendRequest
}
export const FriendRequestItem: FC<Props> = ({ friendRequestDetail }) => {
  const { user } = useContext(AuthContext)
  const friendDetail = getFriendRequestDetails(friendRequestDetail, user)
  const dispatch = useDispatch<AppDispatch>()

  const handleFriendRequest = (type?: string) => {
    const { id } = friendRequestDetail
    switch (type) {
      case 'accept':
        return dispatch(acceptFriendRequestThunk(id))
      case 'reject':
        return dispatch(rejectFriendRequestThunk(id))
      default:
        return dispatch(cancelFriendRequestThunk(id))
    }
  }

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
  )
}
