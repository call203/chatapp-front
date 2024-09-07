import { FC } from 'react'
import CheckImage from '../../Assets/Check.png'
import CloseImage from '../../Assets/Close.png'

type Props = {
  incoming: boolean
  handleFriendRequest: (type?: string) => void
}
export const FriendRequestIcon: FC<Props> = ({
  incoming,
  handleFriendRequest,
}) => {
  return (
    <div className="flex flex-row">
      {incoming && (
        <img
          src={CheckImage}
          className="md:w-7 md:h-7 w-5 h-5 mr-5"
          style={{ cursor: 'pointer' }}
          onClick={() => handleFriendRequest('accept')}
        />
      )}

      <img
        src={CloseImage}
        className="md:w-7 md:h-7 w-5 h-5"
        style={{ cursor: 'pointer' }}
        onClick={() =>
          incoming ? handleFriendRequest('reject') : handleFriendRequest()
        }
      />
    </div>
  )
}
