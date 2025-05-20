import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegistroForm from '../components/RegistroForm'
import '../styles/LoginRegistro.css'

const LoginRegistro = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const toggleForm = () => setIsLogin(!isLogin)

  const handleLogin = async ({ matricula, contrasena }) => {
    try {
      const response = await fetch(
        'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/verificarTipoUsuarioRDS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matricula, contrasena })
        }
      )

      if (response.status === 401) {
        alert('⚠️ Credenciales inválidas')
        return
      }
      if (!response.ok) {
        alert('❌ Error al conectar con el servidor')
        return
      }

      const { token, tipo_usuario, nombre_completo } = await response.json()

      // Guardar token y datos en localStorage
      localStorage.setItem('jwt', token)
      localStorage.setItem('matricula', matricula)
      localStorage.setItem('tipo_usuario', tipo_usuario)
      localStorage.setItem('nombre_completo', nombre_completo || '')

      // Redirigir según rol
      if (tipo_usuario === 'docente') {
        navigate('/AdminPage')
      } else if (tipo_usuario === 'estudiante') {
        navigate('/acciones-estudiante')
      } else {
        alert('⚠️ Tipo de usuario no reconocido.')
      }
    } catch (err) {
      console.error('Error al verificar usuario:', err)
      alert('❌ Error de red. Por favor, inténtalo de nuevo.')
    }
  }

  const handleRegister = async (data) => {
    try {
      const response = await fetch(
        'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/registrarUsuarioRDS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            matricula: data.matricula,
            fullName: data.fullName,
            semestre_id: data.semestre_id,
            contrasena: data.contrasena
          })
        }
      )
      const resultado = await response.json()

      if (response.ok) {
        alert('✅ ¡Registro exitoso! Bienvenido al Desafío Jaguar.')
        setIsLogin(true)
      } else {
        alert('⚠️ Error: ' + (resultado.error || 'No se pudo registrar.'))
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error)
      alert('❌ Error de conexión con el servidor.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-card card p-4">
        <div className="d-flex mb-3">
          <button
            onClick={() => setIsLogin(true)}
            className={`btn ${
              isLogin ? 'btn-danger text-white' : 'btn-light text-danger'
            } flex-fill`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={toggleForm}
            className={`btn ${
              !isLogin ? 'btn-danger text-white' : 'btn-light text-danger'
            } flex-fill`}
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
