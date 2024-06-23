import { Outlet, useParams } from 'react-router-dom'
import { ConversationChannelPage } from '../components/conversation/ConversationChannelPage'
import { ConversationSideBar } from '../components/conversation/ConversationSidebar'
import { Page } from '../utils/styles'

export const ConversationPage = () => {
  const { id } = useParams()
  return (
    <Page display="flex" justifyContent="left">
      <ConversationSideBar conversations={[]} />
      {!id && <ConversationChannelPage />}
      <Outlet />
    </Page>
  )
}
