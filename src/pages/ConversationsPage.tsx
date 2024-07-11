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
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-y-auto">
        <ConversationSideBar conversations={conversations} />

        <div className="flex-1">
          {!id && <ConversationPanel />}
          <Outlet />
        </div>
      </div>
    </div>
    // <div className="flex flex-col h-screen">
    //   <div className="bg-gray-800 text-white py-4 px-6 fixed top-0 left-0 right-0 z-10">
    //     Header content
    //   </div>

    //   <div className="flex flex-1 overflow-y-auto mt-16">
    //     <div className="bg-gray-700 text-white w-64 py-4 px-6">
    //       Sidebar content
    //     </div>

    //     <div className="flex-1 p-6">
    //       <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col h-full">
    //         <div className="bg-gray-300 py-2 px-4 mb-4">Internal Header</div>

    //         <div
    //           className="overflow-y-auto flex-1"
    //           style={{ maxHeight: 'calc(100vh - 200px)' }}
    //         >
    //           {Array.from({ length: 20 }).map((_, index) => (
    //             <p key={index}>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    //               vestibulum, nunc a tempor sodales, purus sem convallis nisi,
    //               nec pretium libero nulla at ipsum.
    //             </p>
    //           ))}
    //         </div>

    //         <div className="bg-gray-300 py-2 px-4 mt-4 sticky bottom-0">
    //           Internal Footer
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
