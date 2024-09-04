import { useEffect } from 'react'
import { fetchFriendsThunk } from '../../store/friendSlice'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useDispatch } from 'react-redux'

export const FriendList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const friends = useSelector((state: RootState) => state.friend)

  useEffect(() => {
    dispatch(fetchFriendsThunk())
  }, [])
  return <div>ji</div>
}
