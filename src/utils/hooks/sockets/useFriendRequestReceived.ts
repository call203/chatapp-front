import { useContext, useEffect } from 'react'
import { SocketContext } from '../../context/SocketContext'
import { FriendRequest } from '../../types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import {
  addFriendRequest,
  fetchFriendsRequestThunk,
} from '../../../store/friendSlice'
import { useToast } from '../useToast'

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  const { info } = useToast({ theme: 'dark', position: 'bottom-left' })

  useEffect(() => {
    dispatch(fetchFriendsRequestThunk())

    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      dispatch(addFriendRequest(payload))
      info(`Incoming Friend Request from ${payload.sender.firstName}`)
    })
  }, [])

  return () => {
    socket.off('onFriendRequestReceived')
  }
}
