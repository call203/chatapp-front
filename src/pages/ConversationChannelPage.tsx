import { useEffect, useState } from 'react'
import { MesasgePanel } from '../components/messages/MessagePanel'
import {
  ConversationType,
  MessageEventPayload,
  MessageType,
} from '../utils/types'
import { getConversationMessages } from '../utils/api'
import { useParams } from 'react-router-dom'
import { socket } from '../utils/context/SocketContext'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { fetchMessagesThunk } from '../store/messageSlice'
import { addConversation } from '../store/conversationSlice'

export const ConversationChannelPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const conversationId = id!
    socket.emit('onConversationJoin', { conversationId })
    socket.on('userJoin', () => {
      console.log('userJoin')
    })
    socket.on('userLeave', () => {
      console.log('userLeave')
    })

    return () => {
      socket.emit('onConversationLeave', { conversationId })
      socket.off('userJoin')
      socket.off('userLeave')
    }
  }, [id])

  return <MesasgePanel></MesasgePanel>
}
