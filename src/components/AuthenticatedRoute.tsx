import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/hooks/useAuth'
import { FC } from 'react'
import { Loading } from './loading'

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation()
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  if (user) return <>{children}</>
  return <Navigate to="/login" state={{ from: location }} replace />
}
