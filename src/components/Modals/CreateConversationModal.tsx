import { ModalBody, ModalContainer, ModalHeader } from '.'
import { CreateConversationForm } from '../forms/CreateConversationForm'
import closeImg from '../../Assets/CloseImg.png'
import { Dispatch, FC, createRef, useState } from 'react'
import { User } from '../../utils/types'
import { postNewConversation } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>()
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>('')
  const [recipientId, setRecipientId] = useState<string>('')

  const createConversation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!recipientId) return
    try {
      const { data } = await postNewConversation({
        recipientId: Number(recipientId),
        content: message,
      })
      const conversationId = data.id
      setShowModal(false)
      navigate(`/conversations/${conversationId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { current } = ref
    if (current === e.target) {
      setShowModal(false)
    }
  }

  return (
    <ModalContainer ref={ref} onClick={handleOverlayClick}>
      <ModalHeader>
        Create a Conversation
        <button onClick={() => setShowModal(false)}>
          <img src={closeImg} alt="add chat" className="w-7 h-7" />
        </button>
      </ModalHeader>
      <ModalBody>
        <CreateConversationForm
          setRecipientId={setRecipientId}
          setMessage={setMessage}
          createConversation={createConversation}
        />
      </ModalBody>
    </ModalContainer>
  )
}
