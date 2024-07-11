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
    <div className="flex flex-col h-full">
      <MessagePanerHeader />

      <div
        className="overflow-y-auto no-scrollbar flex-1 px-5"
        style={{ maxHeight: 'calc(100vh - 140px)' }}
      >
        <MessageContainer messages={messages} />
      </div>
      <div className="fixed bottom-0 w-full">
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}
