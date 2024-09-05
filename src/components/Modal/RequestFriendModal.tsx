import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal'
import { ModalBody } from '.'
import { FC } from 'react'
import { RequestFriendForm } from '../forms/RequestFriendForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const RequestFriendModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className="bg-background_dark2 p-5 ">
            <div className="font-bold pb-5" style={{ fontSize: 20 }}>
              Send a Friend Request
            </div>
            <RequestFriendForm onClose={onClose} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
