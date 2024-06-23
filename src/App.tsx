import { Route, Routes } from 'react-router-dom'

import { RegisterPage } from './pages/RegisterPage'
import { RegisterForm } from './components/forms/RegisterForm'
import { LoginPage } from './pages/LoginPage'
import { ConversationPage } from './pages/ConversationsPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/conversation"
          element={<ConversationPage></ConversationPage>}
        ></Route>
        <Route path="conversation/:id" element={<h1>id</h1>}></Route>
      </Routes>
    </>
  )
}

export default App
