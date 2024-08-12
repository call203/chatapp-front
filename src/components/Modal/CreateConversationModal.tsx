import { Dispatch, FC, createRef, useState } from 'react'
import { ModalBody, ModalContainer, ModalHeader } from '.'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/react'
import { CreateConversationForm } from '../forms/CreateConversationForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const CreateConversationModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className="bg-background_dark2 p-5 ">
            <div className="font-bold pb-5" style={{ fontSize: 20 }}>
              Create a Conversation
            </div>
            <CreateConversationForm onClose={onClose} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
