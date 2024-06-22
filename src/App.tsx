import { Route, Routes } from 'react-router-dom'
import './App.css'
import { RegisterPage } from './pages/RegisterPage'
import { RegisterForm } from './components/forms/RegisterForm'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="chat" element={<h1>conversations</h1>}></Route>
        <Route path=":id" element={<h1>id</h1>}></Route>
      </Routes>
    </>
  )
}

export default App
