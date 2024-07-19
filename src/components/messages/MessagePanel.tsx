import React, { FC, useState } from 'react'
import { MessageInputField } from './MessageInputField'
import { MessagePanerHeader } from './MessagePanelHeader'
import { MessageType } from '../../utils/types'
import { useParams } from 'react-router-dom'
import { MessageContainer } from './MessageContainer'
import { postNewMessage } from '../../utils/api'

type Props = {
  messages: MessageType[]
}

export const MesasgePanel: FC<Props> = ({ messages }) => {
  const [content, setContent] = useState('')
  const { id } = useParams()
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id || !content) return
    const conversationId = parseInt(id)
    try {
      await postNewMessage({ conversationId, content })
      setContent('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <MessagePanerHeader />

      <div
        className="overflow-y-auto flex flex-col-reverse no-scrollbar flex-1 px-5 "
        style={{ maxHeight: 'calc(100vh - 160px)' }}
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
