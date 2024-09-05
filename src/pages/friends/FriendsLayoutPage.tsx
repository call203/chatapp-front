import { useSelector } from 'react-redux'
import { FriendsPageNavBar } from '../../components/Bar/FriendsPageNavBar'
import { FriendsPage } from './FriendsPage'
import { RootState } from '../../store'
import { useState } from 'react'
import { MainButton } from '../../components/MainButton'
import { RequestFriendModal } from '../../components/Modal/RequestFriendModal'
import { useDisclosure } from '@chakra-ui/react'

export const FriendsLayoutPage = () => {
  const friends = useSelector((state: RootState) => state.friend).friends
  const [navId, setNavId] = useState<number>(0)
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <div className="flex flex-col px-5 pt-10 h-full">
      <RequestFriendModal isOpen={isOpen} onClose={onClose} />
      <div className="pb-10 flex flex-row justify-between">
        <div>
          <div className="font-bold mb-3" style={{ fontSize: 28 }}>
            Your Friends
          </div>
          <div> {friends.length} follwers</div>
        </div>

        <div className="w-28" onClick={onOpen}>
          <MainButton className="md:text-xsm">Add friend</MainButton>
        </div>
      </div>

      <FriendsPageNavBar setNavId={setNavId} />
      {navId === 0 && <FriendsPage />}
    </div>
  )
}
