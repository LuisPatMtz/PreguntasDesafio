import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('')
  const [contrasena, setContrasena] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ matricula, contrasena })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Matrícula</label>
        <input
          type="text"
          className="form-control"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-danger w-100">
        Ingresar
      </button>
    </form>
  )
}

export default LoginForm
