import React, { FC, useState } from 'react'
import { MessageInputField } from './MessageInputField'
import { MessagePanerHeader } from './MessagePanelHeader'
import { MessageType } from '../../utils/types'
import { useParams } from 'react-router-dom'
import { MessageContainer } from './MessageContainer'

type Props = {
  messages: MessageType[]
}

export const MesasgePanel: FC<Props> = ({ messages }) => {
  const [content, setContent] = useState('')
  const { id } = useParams()
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="bg-b_1f1f1f h-full w-full flex flex-col">
      <div className="sticky top-0">
        <MessagePanerHeader />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow overflow-y-auto">
          <MessageContainer messages={messages} />
        </div>
        <div className="sticky bottom-0">
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  )
}
