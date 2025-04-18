import React, { useState } from 'react'

const RegistroForm = ({ onRegister }) => {
  const [fullName, setFullName] = useState('')
  const [matricula, setMatricula] = useState('')
  const [semestre, setSemestre] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const matriculaRegex = /^\d{9}$/
    if (!matriculaRegex.test(matricula)) {
      alert('La matrícula debe contener exactamente 9 dígitos.')
      return
    }

    if (password !== verifyPassword) {
      alert('Las contraseñas no coinciden.')
      return
    }

    onRegister({
      fullName,
      matricula,
      semestre,
      tipo_usuario: 'estudiante',
      password
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre Completo</label>
        <input
          type="text"
          className="form-control"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Matrícula (9 dígitos)</label>
        <input
          type="text"
          className="form-control"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          maxLength={9}
          pattern="\d{9}"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Semestre</label>
        <select
          className="form-select"
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
          required
        >
          <option value="">Seleccionar semestre</option>
          <option value="2do">2do semestre</option>
          <option value="4to">4to semestre</option>
          <option value="6to">6to semestre</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Verificar Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-danger w-100">
        Registrarse
      </button>
    </form>
  )
}

export default RegistroForm
