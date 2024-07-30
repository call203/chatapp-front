import { useParams } from 'react-router-dom'
import { getRecipientFromConversation } from '../../utils/helper'
import { ConversationSideBar } from '../conversation/ConversationSidebar'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { selectConversationById } from '../../store/conversationSlice'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext'

export const MessagePanelHeader = () => {
  const { id } = useParams()
  const user = useContext(AuthContext).user!
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, Number(id)),
  )
  const recipient = getRecipientFromConversation(conversation, user)

  return (
    <div className="bg-b_131313 flex items-center py-3 px-5 text-white">
      <div className="h-11 w-11 bg-red-400 rounded-full mr-5"></div>
      <div>
        {recipient?.firstName} {recipient?.lastName}
      </div>
    </div>
  )
}
