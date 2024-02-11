import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './views/loginPage'
import TaskList from './views/Tasks/TaskList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="/tasklist" element={<TaskList />} /> 
      {/* Puedes definir más rutas aquí */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
