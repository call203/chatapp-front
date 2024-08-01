import { Outlet, useParams } from 'react-router-dom'
import { ConversationSideBar } from '../components/conversation/ConversationSidebar'
import { useEffect } from 'react'
import { ConversationPanel } from '../components/conversation/ConversationPanel'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import {
  addConversation,
  fetchConversationThunk,
} from '../store/conversationSlice'
import { useSelector } from 'react-redux'
import { addMessage, fetchMessagesThunk } from '../store/messageSlice'
import { socket } from '../utils/context/SocketContext'
import { ConversationType, MessageEventPayload } from '../utils/types'

export const ConversationPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const conversations = useSelector((state: RootState) => state.conversation)

  useEffect(() => {
    dispatch(fetchConversationThunk())
  }, [])
  useEffect(() => {
    if (id) {
      const coversationId = parseInt(id)
      dispatch(fetchMessagesThunk(coversationId))
    }
  }, [id])

  useEffect(() => {
    const conversationId = id!
    socket.on('connected', (data) => {
      console.log('Connected to Websocket')
    })

    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation, message } = payload
      dispatch(addMessage(payload))
    })

    socket.on('onConversation', (payload: ConversationType) => {
      console.log('Conversation Event')
      console.log(payload)
      dispatch(addConversation(payload))
    })

    socket.emit('onConversationJoin', { conversationId })

    return () => {
      socket.off('connected')
      socket.off('onConversation')
      socket.off('onMessage')
    }
  }, [id])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-y-auto">
        <ConversationSideBar
          conversations={conversations.conversations}
          loading={conversations.loading}
        />

        <div className="flex-1">
          {!id && <ConversationPanel />}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
