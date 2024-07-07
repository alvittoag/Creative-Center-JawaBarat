import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/globals/Navbar'
import Footer from './components/globals/Footer'
import Router from './router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router/>
    </>
  )
}

export default App
