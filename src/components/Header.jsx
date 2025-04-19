// src/components/Header.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  const handleLogout = () => {
    localStorage.removeItem('matricula')
    localStorage.removeItem('materia_seleccionada')
    navigate('/')
  }

  const irAPrincipal = () => {
    localStorage.removeItem('materia_seleccionada')
    if (matricula) {
      navigate(`/panel-estudiante/${matricula}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className="app-header">
      <h4 className="logo-text" onClick={irAPrincipal} style={{ cursor: 'pointer' }}>
        Desafío Jaguar
      </h4>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Header
