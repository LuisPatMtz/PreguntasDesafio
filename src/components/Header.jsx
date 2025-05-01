import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = ({ tipo = 'estudiante', nombre = '' }) => {
  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const irAPrincipal = () => {
    if (tipo === 'admin') {
      navigate('/panel-admin')
    } else if (matricula) {
      navigate(`/panel-estudiante/${matricula}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className="app-header">
      <h4 className="logo-text" onClick={irAPrincipal}>
        Desafio jaguar
      </h4>

      <div className="header-right">
        {nombre && <span className="user-name">👤 {nombre}</span>}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Header
