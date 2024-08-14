import { Outlet } from 'react-router-dom'
import { UserSidebar } from '../components/sidebars/UserSidebar'
import { ProfileContainer } from '../components/profile/ProfileContainer'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const AppPage = () => {
  const profile = useSelector((state: RootState) => state.profile.open)

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-y-auto">
        <UserSidebar />
        <div className="flex-1">
          {profile && <ProfileContainer />}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
