import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/hooks/useAuth'
import { FC } from 'react'

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation()
  const { loading, user } = useAuth()
  console.log(user)
  console.log('hi~')
  if (loading) {
    return <div>loading...</div>
  }
  if (user) return <>{children}</>
  return <Navigate to="/login" state={{ from: location }} replace />
}
