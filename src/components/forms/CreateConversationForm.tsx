import { MainButton } from '../MainButton'

export const CreateConversationForm = () => {
  return (
    <form className="w-full">
      <section>
        <div className="bg-b_131313 rounded-md py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Recipient</div>
          <input
            className="bg-inherit text-white text-base "
            style={{ border: 'none', outline: 'none' }}
          />
        </div>
      </section>
      <section>
        <div className="bg-b_131313 rounded-md w-full py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Mesage (optional)</div>
          <input
            className="bg-inherit text-white w-full text-base"
            style={{ border: 'none', outline: 'none' }}
          />
        </div>
      </section>
      <MainButton>Create Conversation</MainButton>
    </form>
  )
}
