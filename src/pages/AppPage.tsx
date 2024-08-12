import { Outlet } from 'react-router-dom'
import { UserSidebar } from '../components/sidebars/UserSidebar'
import { ProfileContainer } from '../components/profile/ProfileContainer'
import { useState } from 'react'

export const AppPage = () => {
  const [profile, setProfile] = useState(false)
  const handleProfileContainer = () => {
    setProfile(!profile)
  }
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-y-auto">
        <UserSidebar handleProfileContainer={handleProfileContainer} />
        <div className="flex-1">
          {profile && (
            <ProfileContainer handleProfileContainer={handleProfileContainer} />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
