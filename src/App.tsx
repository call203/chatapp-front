import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>hi</h1>}></Route>
        <Route path="chat" element={<h1>conversations</h1>}></Route>
        <Route path=":id" element={<h1>id</h1>}></Route>
      </Routes>
    </>
  )
}

export default App
