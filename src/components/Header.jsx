import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('matricula')
    navigate('/')
  }

  return (
    <header className="app-header">
      <h4 className="logo-text">Desafío Jaguar</h4>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Header