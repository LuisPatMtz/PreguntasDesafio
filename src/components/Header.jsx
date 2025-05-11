import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Header.css'

const Header = ({ tipo = 'estudiante', nombre = '' }) => {
  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  // Sanitiza el nombre: si viene vacío o es la cadena "undefined", usa un fallback
  const displayName =
    nombre &&
    nombre.toLowerCase() !== 'undefined'
      ? nombre
      : tipo === 'admin'
      ? 'Docente'
      : tipo === 'estudiante'
      ? 'Estudiante'
      : ''

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
        {displayName && <span className="user-name">👤 {displayName}</span>}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Header
