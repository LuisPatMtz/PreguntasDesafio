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

  const handleRegister = async (data) => {
    try {
      const response = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/registrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const resultado = await response.json();
  
      if (response.ok) {
        alert('✅ Registro exitoso: ' + resultado.mensaje);
        console.log("Resultado de Lambda:", resultado);
      } else {
        alert('⚠️ Error: ' + (resultado.mensaje || 'No se pudo registrar.'));
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("❌ Error de conexión con el servidor.");
    }
  };
  

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
