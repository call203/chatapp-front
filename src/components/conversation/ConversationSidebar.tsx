import { FC, useState } from 'react'
import addChatImg from '../../Assets/AddChatImg.png'
import { ConversationType } from '../../utils/styles/types'
import { useNavigate } from 'react-router-dom'
import { CreateConversationModal } from '../Modals/CreateConversationModal'

type Props = {
  conversations: ConversationType[]
}
export const ConversationSideBar: FC<Props> = ({ conversations }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <div className="w-3/12 bg-b_1f1f1f h-screen flex flex-col">
        <div className=" h-16 flex justify-between items-center px-5 border-b border-slate-700">
          <p className="font-semibold text-base">Conversations</p>
          <button onClick={() => setShowModal(!showModal)}>
            <img src={addChatImg} alt="add chat" className="w-7 h-7" />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {conversations.map(() => {
            return (
              <div className="overflow-y-auto">
                <div className="py-3 pl-8 flex align-middle border-b border-slate-700">
                  <div className="h-9 w-9 bg-red-400 rounded-full"></div>
                  <div className="ml-5">
                    <div className="text-sm font-bold">Name</div>
                    <div className="text-sm">Text</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
