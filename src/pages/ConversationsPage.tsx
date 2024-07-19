import { Outlet, useParams } from 'react-router-dom'
import { ConversationSideBar } from '../components/conversation/ConversationSidebar'
import { useEffect } from 'react'
import { ConversationPanel } from '../components/conversation/ConversationPanel'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { fetchConversationThunk } from '../store/conversationSlice'
import { useSelector } from 'react-redux'

export const ConversationPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const conversations = useSelector((state: RootState) => state.conversation)

  useEffect(() => {
    dispatch(fetchConversationThunk())
  }, [])

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
