import { Outlet } from 'react-router-dom'
import { UserSidebar } from '../components/sidebars/UserSidebar'

export const AppPage = () => {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-y-auto ">
        <UserSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
