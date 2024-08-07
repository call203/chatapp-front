import defaultImg from '../../Assets/DefaultProfile.png'
import closeImg from '../../Assets/Close.png'
import editImg from '../../Assets/Pencil.png'
import { format } from 'date-fns'

type Props = {
  handleProfileContainer: () => void
}
export const ProfileContainer = ({ handleProfileContainer }: Props) => {
  return (
    <div
      className={`h-full absolute right-0 z-10 bg-backgroun_dark2 w-full md:w-6/12 lg:w-4/12 `}
    >
      <div className="p-5 ">
        <div className="flex flex-row justify-between">
          <div className="text-6xl font-bold pb-8">Profile</div>
          <img
            src={closeImg}
            className="w-7 h-7"
            onClick={handleProfileContainer}
          />
        </div>

        <div className="flex justify-center pb-8">
          <div className="relative">
            <img src={defaultImg} className="w-56" />
            <div className="absolute bottom-1 right-8  bg-my_blue p-2 rounded-full">
              <img src={editImg} className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="pb-8">
          <div className="pb-5">Todo - Add Active</div>
          <div className="pb-5">
            <p className="font-semibold mb-2">Local time</p>
            <p>{format(new Date(), 'yyyy-MM-dd HH:mm')}</p>
          </div>
          <div className="pb-5">
            <div className="flex flex-row ">
              <div className="text-6xl font-bold mr-5 mb-2">About tme</div>
              <img src={editImg} className="w-5 h-5" />
            </div>
            <p>Todo -About me</p>
          </div>
        </div>
      </div>
    </div>
  )
}
