import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/AccionesEstudiante.css'
import Header from '../components/Header'

const AccionesEstudiante = () => {
  const { matricula } = useParams()
  const navigate = useNavigate()
  const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false)
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    // Obtener nombre del estudiante
    fetch(`https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerUsuarioRDS?matricula=${matricula}`)
      .then(res => res.json())
      .then(data => {
        if (data.nombre_completo) setNombre(data.nombre_completo)
      })
      .catch(err => console.error('Error al obtener nombre:', err))

    // Verificar asistencia
    fetch(`https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/verificarAsistenciaRDSs?matricula=${matricula}`)
      .then(res => res.json())
      .then(data => {
        if (data.asistencia_confirmada) setAsistenciaConfirmada(true)
      })
      .catch(err => console.error('Error al consultar asistencia:', err))
  }, [matricula])

  const confirmarAsistencia = async () => {
    try {
      const response = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/confirmarAsistenciaRDSs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula })
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Asistencia confirmada')
        setAsistenciaConfirmada(true)
      } else {
        alert(`⚠️ Error: ${result.error || 'No se pudo confirmar la asistencia'}`)
      }
    } catch (error) {
      console.error(error)
      alert('Todavia no es momento bro.')
    }
  }

  return (
    <>
      <Header onLogoClick={() => navigate(`/acciones-estudiante/${matricula}`)} />

      <div className="acciones-container">
        <div className="acciones-overlay"></div>

        <div className="acciones-card animate-fade-slide">
          <h3 className="bienvenida">¡Bienvenido{nombre && `, ${nombre}`}! 👋</h3>
          <h2>¿Que deseas hacer?</h2>

          <div className="acciones-botones">
            <button
              className="btn-responder animate-btn"
              onClick={() => navigate(`/panel-estudiante/${matricula}`)}
            >
              Agregar preguntas
            </button>

            <button
              className="btn-asistencia animate-btn"
              onClick={confirmarAsistencia}
              disabled={asistenciaConfirmada}
            >
              {asistenciaConfirmada ? 'Asistencia confirmada' : 'Confirmar asistencia'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccionesEstudiante
