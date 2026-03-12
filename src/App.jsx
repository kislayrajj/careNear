import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './pages/public/Landing'
function App() {

  return (
    <>
    <Navbar/>
  <Routes>
    <Route path='/' element={<Landing/>}/>
  </Routes>
    </>
  )
}

export default App
