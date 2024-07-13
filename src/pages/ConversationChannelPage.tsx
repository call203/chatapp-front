import { useEffect, useState } from 'react'
import { MesasgePanel } from '../components/messages/MessagePanel'
import { MessageEventPayload, MessageType } from '../utils/types'
import { getConversationMessages } from '../utils/api'
import { useParams } from 'react-router-dom'
import { socket } from '../utils/context/SocketContext'

export const ConversationChannelPage = () => {
  const [message, setMessage] = useState<MessageType[]>([])
  const { id } = useParams()

  useEffect(() => {
    const conversationId = parseInt(id!)
    getConversationMessages(conversationId)
      .then(({ data }) => {
        setMessage(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    socket.on('connected', () => console.log('Connected'))
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received')
      const { conversation, ...message } = payload
      setMessage((prev) => [message, ...prev])
    })
    return () => {
      socket.off('disconnected')
      socket.off('off Message')
    }
  }, [])

  return <MesasgePanel messages={message}></MesasgePanel>
}
