import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const navigate = useNavigate()
  const tipo = localStorage.getItem('tipo_usuario')
  const nombre = localStorage.getItem('nombre_completo')

  // Sanitiza el nombre
  const displayName =
    nombre && nombre.toLowerCase() !== 'undefined'
      ? nombre
      : tipo === 'docente'
      ? 'Docente'
      : tipo === 'estudiante'
      ? 'Estudiante'
      : ''

  const handleLogoClick = () => {
    if (tipo === 'docente') {
      navigate('/AdminPage')
    } else if (tipo === 'estudiante') {
      navigate('/panel-estudiante')
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <header className="app-header">
      <h4 className="logo-text" onClick={handleLogoClick}>
        Desafío Jaguar
      </h4>
      <div className="header-right">
        {displayName && <span className="user-name">👤 {displayName}</span>}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Header
