import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const RequestNumber = () => {
  const friends = useSelector((state: RootState) => state.friend).friendRequests
  return (
    <>
      {friends.length > 0 && (
        <div className="px-1 text-xxsm py-0 rounded-sm bg-my_red  absolute top-4 right-3 text-center">
          {friends.length}
        </div>
      )}
    </>
  )
}
