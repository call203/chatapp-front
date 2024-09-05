import { useSelector } from 'react-redux'
import { FriendsPageNavBar } from '../../components/Bar/FriendsPageNavBar'
import { FriendsPage } from './FriendsPage'
import { RootState } from '../../store'
import { useState } from 'react'

export const FriendsLayoutPage = () => {
  const friends = useSelector((state: RootState) => state.friend).friends
  const [navId, setNavId] = useState<number>(0)

  return (
    <div className="flex flex-col px-5 pt-10 h-full">
      <div className="pb-10">
        <div className="font-bold mb-3" style={{ fontSize: 28 }}>
          Your Friends
        </div>
        <div> {friends.length} follwers</div>
      </div>

      <FriendsPageNavBar setNavId={setNavId} />
      {navId === 0 && <FriendsPage />}
    </div>
  )
}
