import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ConversationPage } from './pages/ConversationsPage'
import { AuthenticatedRoute } from './components/AuthenticatedRoute'
import { AuthContext } from './utils/context/AuthContext'
import { User } from './utils/types'
import React, { PropsWithChildren, useState } from 'react'
import { ConversationChannelPage } from './pages/ConversationChannelPage'
import { SocketContext, socket } from './utils/context/SocketContext'
import { Socket } from 'socket.io-client'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { AppPage } from './pages/AppPage'
import { ToastContainer } from 'react-toastify'

type Props = {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  socket: Socket
}
function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  )
}

function App() {
  const [user, setUser] = useState<User>()
  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
      <Routes>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<AuthenticatedRoute children={<AppPage />} />}>
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
        </Route>
      </Routes>
      <ToastContainer />
    </AppWithProviders>
  )
}

export default App
