import { ConversationSideBar } from '../conversation/ConversationSidebar'

export const MessagePanerHeader = () => {
  return (
    <div className="bg-b_131313 flex items-center py-3 px-5 text-white">
      <div className="h-11 w-11 bg-red-400 rounded-full mr-5"></div>
      <div>FirstName LastName</div>
    </div>
  )
}
