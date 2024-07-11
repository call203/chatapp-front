import { useEffect, useState } from 'react'
import { MesasgePanel } from '../components/messages/MessagePanel'
import { MessageType } from '../utils/types'
import { getConversationMessages } from '../utils/api'
import { useParams } from 'react-router-dom'

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

  // useEffect(()=>{

  // },[])
  return <MesasgePanel messages={message}></MesasgePanel>
}
