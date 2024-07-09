import { FC, useContext } from 'react'
import { MessageType, User } from '../../utils/types'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/context/AuthContext'
import { formatRelative } from 'date-fns'

type Props = {
  messages: MessageType[]
}

type FormatteMessageProps = {
  user?: User
  // message: MessageType
  message: string
  key: number
}

export const FormattedMessage: FC<FormatteMessageProps> = ({
  user,
  message,
}) => {
  return (
    <div className="flex pb-5">
      <div className="h-9 w-9 bg-red-400 rounded-full"></div>
      <div className="ml-4">
        <span
          className={
            `text-my_orange text-xsm mr-3`
            //   user?.id === message.author.id ? `text - my_orange` : `text - my_blue`
          }
        >
          FirstName LastName
        </span>
        <span className="text-my_gray text-xxsm">
          {formatRelative(new Date('2024-07-07T13:23:54.836Z'), new Date())}
        </span>
        <div className="py-1 text-xsm">hi how are you</div>
      </div>
    </div>
  )
}

export const MessageContainer: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const formatMessage = () => {
    return (
      <div className="py-3 px-5">
        <FormattedMessage
          key={1}
          user={user}
          message={'welkrj'}
        ></FormattedMessage>
      </div>
    )
  }

  return <div>{formatMessage()}</div>
}
