import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegistroForm from '../components/RegistroForm'
import '../styles/LoginRegistro.css'  // Importa estilos personalizados

const LoginRegistro = () => {
  const [isLogin, setIsLogin] = useState(true)
  
  const toggleForm = () => setIsLogin(!isLogin)

  const handleLogin = (data) => {
    console.log("Datos de login:", data)
    alert("Login exitoso (simulado).")
  }

  const handleRegister = (data) => {
    console.log("Datos de registro:", data)
    alert("Registro exitoso (simulado).")
  }

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-card card p-4">
        <div className="d-flex mb-3">
          <button
            onClick={() => setIsLogin(true)}
            className={`btn ${isLogin ? 'btn-danger text-white' : 'btn-light text-danger'} flex-fill`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={toggleForm}
            className={`btn ${!isLogin ? 'btn-danger text-white' : 'btn-light text-danger'} flex-fill`}
          >
            Registrar
          </button>
        </div>
        <div className="card-body">
          {isLogin ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegistroForm onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginRegistro
