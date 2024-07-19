import { FC, useContext, useEffect } from 'react'
import { MessageType, User } from '../../utils/types'
import { Form, useParams } from 'react-router-dom'
import { AuthContext } from '../../utils/context/AuthContext'
import { compareAsc, formatRelative } from 'date-fns'

type Props = {
  messages: MessageType[]
}

type FormatteMessageProps = {
  user?: User
  message: MessageType
}

export const FormattedMessage: FC<FormatteMessageProps> = ({
  user,
  message,
}) => {
  return (
    <div className="flex flex-center flex-row pt-5">
      <div className="h-11 w-11 bg-red-400 rounded-full" />

      <div className="ml-4">
        <div className="flex flex-col">
          <div className="flex flx-row items-center">
            <span
              className={`text-sm pr-2 ${
                user?.id === message.author.id
                  ? `text-my_orange`
                  : `text-my_blue`
              }`}
            >
              {message.author.firstName} {message.author.lastName}
            </span>
            <span className="text-my_gray text-xxsm">
              {formatRelative(new Date(message.createdAt), new Date())}
            </span>
          </div>
          <div className="py-1 text-xsm">{message.content}</div>
        </div>
      </div>
    </div>
  )
}

export const MessageContainer: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const formatMessage = () => {
    return (
      <div>
        {messages.reverse().map((m, index, arr) => {
          let prevIndex = index - 1
          let prev = arr[prevIndex]

          if (
            index > 0 &&
            prev.author.id === m.author.id &&
            prev.createdAt.substring(0, prev.createdAt.lastIndexOf(':')) ===
              m.createdAt.substring(0, m.createdAt.lastIndexOf(':'))
          ) {
            return (
              <div className="ml-10" key={m.id}>
                <div className="ml-5 py-1 text-xsm">{m.content}</div>
              </div>
            )
          }
          return <FormattedMessage user={user} message={m} key={m.id} />
        })}
      </div>
    )
  }

  useEffect(() => {
    formatMessage()
  })

  return <>{formatMessage()}</>
}
