import LogoutImg from '../../Assets/Logout.png'
import DefaultProfile from '../../Assets/DefaultProfile.png'
import { userSidebarItems } from '../../utils/constants'
export const UserSidebar = () => {
  const getImage = (path: string) => {
    try {
      return require(`../../Assets${path}`)
    } catch (err) {
      console.error(`Error loading image at path: ../../Assets${path}`, err)
      return null
    }
  }

  return (
    <div className="w-24 flex flex-col bg-backgroun_dark1  justify-between py-5">
      <div className="flex flex-col w-full">
        {/** Default Profile */}
        <div className="flex justify-center items-center">
          <img src={DefaultProfile} className="w-12 mb-8" />
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
        <img src={LogoutImg} className="w-8 rotate-180" />
      </div>
    </div>
  )
}
