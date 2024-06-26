import { useContext, useEffect, useState } from 'react'
import { getAuthUser } from '../api'
import { AuthContext } from '../context/AuthContext'

export const useAuth = () => {
  const [loading, setLoading] = useState(true)
  const { user, updateAuthUser } = useContext(AuthContext)
  const controller = new AbortController()

  useEffect(() => {
    getAuthUser()
      .then(({ data }: any) => {
        updateAuthUser(data)
        console.log('hooks')
        console.log(user)
        setTimeout(() => setLoading(false), 1000)
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => setLoading(false), 1000)
      })
    return () => {
      controller.abort()
    }
  }, [])
  return { user, loading }
}
