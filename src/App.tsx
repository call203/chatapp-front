import { Route, Routes } from 'react-router-dom'

import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ConversationPage } from './pages/ConversationsPage'
import { AuthenticatedRoute } from './components/AuthenticatedRoute'
import { AuthContext } from './utils/context/AuthContext'
import { User } from './utils/types'
import { useState } from 'react'
import { ConversationChannelPage } from './pages/ConversationChannelPage'
import { SocketContext, socket } from './utils/context/SocketContext'

function App() {
  const [user, setUser] = useState<User>()
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
