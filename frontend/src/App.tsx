import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './views/loginPage'
import TaskList from './views/Tasks/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TaskList  />
  )
}

export default App
