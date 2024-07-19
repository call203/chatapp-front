import { FC, useContext, useState } from 'react'
import addChatImg from '../../Assets/AddChatImg.png'
import { ConversationType } from '../../utils/types'
import { useNavigate } from 'react-router-dom'
import { CreateConversationModal } from '../Modals/CreateConversationModal'
import { AuthContext } from '../../utils/context/AuthContext'
import { Loading } from '../loading'

type Props = {
  conversations: ConversationType[]
  loading: Boolean
}
export const ConversationSideBar: FC<Props> = ({ conversations, loading }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id
      ? conversation.recipient
      : conversation.creator
  }

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <div className="w-3/12 bg-b_1f1f1f flex flex-col">
        <div className=" h-16 flex justify-between items-center px-5 border-b border-slate-700">
          <p className="font-semibold text-base">Conversations</p>
          <button onClick={() => setShowModal(!showModal)}>
            <img src={addChatImg} alt="add chat" className="w-7 h-7" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {loading && <Loading />}
          {conversations.map((conversation) => {
            return (
              <>
                <div
                  className="overflow-y-auto"
                  key={conversation.id}
                  onClick={() => navigate(`/conversations/${conversation.id}`)}
                >
                  <div className="py-3 pl-8 flex align-middle border-b border-slate-700 ">
                    <div className="h-9 w-9 bg-red-400 rounded-full"></div>

                    <div className="ml-5">
                      <div className="text-sm font-bold">
                        {`${getDisplayUser(conversation).firstName}`}
                        {`  ${getDisplayUser(conversation).lastName}`}
                      </div>
                      <div className="text-sm text-gray-300 ">
                        {conversation.lastMessageSent?.content}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
