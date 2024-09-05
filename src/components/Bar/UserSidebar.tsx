import LogoutImg from '../../Assets/Logout.png'
import DefaultProfile from '../../Assets/DefaultProfile.png'
import { userSidebarItems } from '../../utils/constants'
import { postLogoutUser } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext'
import { setProfileInfo, toggleProfile } from '../../store/profileSlice'
import { useDispatch } from 'react-redux'

export const UserSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const handleProfile = () => {
    if (user) {
      dispatch(setProfileInfo(user))
      dispatch(toggleProfile())
    }
  }

  return (
    <div className="md:w-20  w-full flex flex-row md:flex-col bg-background_dark1 justify-between md:h-full absolute bottom-0 md:static md:bottom-auto md:py-5">
      <div className="flex w-full flex-row md:flex-col justify-evenly ">
        <div className="flex justify-center items-center">
          <img
            src={user?.profile?.image ? user.profile.image : DefaultProfile}
            className="w-11 h-11 md:mb-5 rounded-full"
            onClick={handleProfile}
          />
        </div>
        <div className="flex flex-row md:flex-col">
          {userSidebarItems.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex justify-center items-center py-5 px-5`}
                onClick={() => navigate(item.path)}
              >
                <img
                  className="w-8"
                  src={getImage(item.pathname)}
                  alt={item.id}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className={'md:flex justify-center items-center hidden'}>
        <img
          onClick={() => logoutUser()}
          src={LogoutImg}
          className="w-7 rotate-180"
        />
      </div>
    </div>
  )
}
