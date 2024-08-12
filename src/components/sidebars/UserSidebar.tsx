import LogoutImg from '../../Assets/Logout.png'
import DefaultProfile from '../../Assets/DefaultProfile.png'
import { userSidebarItems } from '../../utils/constants'
import { postLogoutUser } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext'

type Props = {
  handleProfileContainer: () => void
}
export const UserSidebar = ({ handleProfileContainer }: Props) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const getImage = (path: string) => {
    try {
      return require(`../../Assets${path}`)
    } catch (err) {
      console.error(`Error loading image at path: ../../Assets${path}`, err)
      return null
    }
  }

  const logoutUser = () => {
    postLogoutUser().then(() => {
      try {
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    })
  }

  return (
    <div className="w-24 flex flex-col bg-background_dark1  justify-between py-5">
      <div className="flex flex-col w-full">
        {/** Default Profile */}
        <div className="flex justify-center items-center">
          <img
            src={user?.profile?.image ? user.profile.image : DefaultProfile}
            className="w-11 h-11 mb-8 rounded-full"
            onClick={() => handleProfileContainer()}
          />
        </div>
        {/** Menu */}
        <div>
          {userSidebarItems.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex justify-center items-center py-5`}
              >
                <img
                  className="w-9"
                  src={getImage(item.pathname)}
                  alt={item.id}
                />
              </div>
            )
          })}
        </div>
      </div>
      {/** Logout */}
      <div className={'flex justify-center items-center'}>
        <img
          onClick={() => logoutUser()}
          src={LogoutImg}
          className="w-8 rotate-180"
        />
      </div>
    </div>
  )
}
