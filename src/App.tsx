import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { RegisterPage } from './pages/RegisterPage'
import { RegisterForm } from './components/forms/RegisterForm'
import { LoginPage } from './pages/LoginPage'
import { ConversationPage } from './pages/ConversationsPage'
import { useAuth } from './utils/hooks/useAuth'
import { AuthenticatedRoute } from './components/AuthenticatedRoute'
import { AuthContext } from './utils/context/AuthContext'
import { User } from './utils/types'
import { useState } from 'react'
import { ConversationChannelPage } from './pages/ConversationChannelPage'

function App() {
  const [user, setUser] = useState<User>()
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <Routes>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/conversations"
          element={
            <AuthenticatedRoute>
              <ConversationPage></ConversationPage>
            </AuthenticatedRoute>
          }
        >
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
