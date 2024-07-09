import { Outlet, useParams } from 'react-router-dom'
import { ConversationSideBar } from '../components/conversation/ConversationSidebar'
import { Page } from '../utils/styles'
import { useEffect, useState } from 'react'
import { ConversationType } from '../utils/types'
import { getConversations } from '../utils/api'
import { ConversationPanel } from '../components/conversation/ConversationPanel'
import { MessagePanerHeader } from '../components/messages/MessagePanelHeader'

export const ConversationPage = () => {
  const { id } = useParams()
  const [conversations, setConversations] = useState<ConversationType[]>([])

  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        setConversations(data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <Page display="flex" justifyContent="left">
      <ConversationSideBar conversations={conversations} />
      {!id && <ConversationPanel />}

      <Outlet />
    </Page>
  )
}
