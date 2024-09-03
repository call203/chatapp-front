import { FriendsPageNaveBar } from '../../components/Bar/FriendsPageNavBar'
import { FriendsPage } from './FriendsPage'

export const FriendsLayoutPage = () => {
  return (
    <div className="flex flex-col px-5 pt-10">
      <div className="pb-10">
        <div className="font-bold mb-3" style={{ fontSize: 28 }}>
          Your Friends
        </div>
        <div> 200 follwers</div>
      </div>

      <FriendsPageNaveBar />
      <FriendsPage />
    </div>
  )
}
