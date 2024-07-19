import { Dispatch, FC, SetStateAction } from 'react'
import { MainButton } from '../MainButton'

type Props = {
  setRecipientId: Dispatch<SetStateAction<string>>
  setMessage: Dispatch<SetStateAction<string>>
  createConversation: (e: React.FormEvent<HTMLFormElement>) => void
}

export const CreateConversationForm: FC<Props> = ({
  setRecipientId,
  setMessage,
  createConversation,
}) => {
  return (
    <form className="w-full" onSubmit={createConversation}>
      <section>
        <div className="bg-b_131313 rounded-md py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Recipient</div>
          <input
            className="bg-inherit text-white text-bas w-full"
            style={{ border: 'none', outline: 'none' }}
            onChange={(e) => setRecipientId(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="bg-b_131313 rounded-md w-full py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Mesage (optional)</div>
          <input
            className="bg-inherit text-white w-full text-base"
            style={{ border: 'none', outline: 'none' }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </section>
      <MainButton>Create Conversation</MainButton>
    </form>
  )
}
