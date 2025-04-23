import React, { useEffect, useState } from 'react'

const ConfirmarPreguntas = () => {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)

  // 🎯 Toast
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastError, setToastError] = useState(false)

  // Mostrar toast
  const mostrarToast = (mensaje, error = false) => {
    setToastMessage(mensaje)
    setToastError(error)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerPreguntasPendientesPorMateriaRDS')
        const data = await res.json()
        setMaterias(data)
        setLoading(false)
      } catch (err) {
        console.error('Error al cargar preguntas:', err)
        mostrarToast('Error al cargar preguntas', true)
      }
    }

    fetchPreguntas()
  }, [])

  const gestionarPregunta = async (id, accion) => {
    try {
      const res = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/gestionarPreguntaRDS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, accion })
      })

      if (res.ok) {
        setMaterias(prev =>
          prev.map(m => ({
            ...m,
            preguntas: m.preguntas.filter(p => p.id !== id)
          }))
        )

        mostrarToast(`Pregunta ${accion === 'confirmar' ? 'confirmada' : 'eliminada'} correctamente`)
      } else {
        mostrarToast('Error al procesar la acción', true)
      }
    } catch (err) {
      console.error(`Error al ${accion} pregunta:`, err)
      mostrarToast('Error del servidor', true)
    }
  }

  if (loading) return <p>Cargando preguntas...</p>

  return (
    <div className="confirmar-container">
      <h2>Preguntas pendientes por confirmar</h2>

      {materias.map((materia, idx) => (
        <details key={idx} className="materia-section" open>
          <summary className="materia-summary">
            {materia.materia} ({materia.preguntas.length} pendiente{materia.preguntas.length !== 1 ? 's' : ''})
          </summary>

          {materia.preguntas.length > 0 ? (
            <table className="pregunta-table">
              <thead>
                <tr>
                  <th>Enunciado</th>
                  <th>Justificación</th>
                  <th>Autor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materia.preguntas.map(pregunta => (
                  <tr key={pregunta.id}>
                    <td>{pregunta.enunciado}</td>
                    <td>{pregunta.justificacion}</td>
                    <td>{pregunta.autor}</td>
                    <td>
                      <button className="boton-confirmar" onClick={() => gestionarPregunta(pregunta.id, 'confirmar')}>
                        Confirmar
                      </button>
                      <button className="boton-rechazar" onClick={() => gestionarPregunta(pregunta.id, 'rechazar')}>
                        Rechazar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ padding: '1rem' }}>No hay preguntas pendientes.</p>
          )}
        </details>
      ))}

      {/* ✅ Toast visual */}
      {toastVisible && (
        <div className={`toast ${toastVisible ? 'show' : ''} ${toastError ? 'error' : ''}`}>
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default ConfirmarPreguntas
