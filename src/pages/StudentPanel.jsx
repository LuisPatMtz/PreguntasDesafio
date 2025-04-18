import React, { useEffect, useState } from 'react'
import '../styles/studentPanel.css'
import ProgressCircle from '../components/ProgressCircle'

const StudentPanel = () => {
  const [materias, setMaterias] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)

  const matricula = localStorage.getItem('matricula')

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(
          `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerProgresoEstudianteRDS?matricula=${matricula}`
        )
        const data = await response.json()

        const materiasConProgreso = data.map(materia => {
          const progreso = Array.from({ length: 4 }).map((_, i) => {
            if (i < materia.confirmadas) return true
            if (i < materia.total_preguntas) return false
            return null // faltante
          })
          return { ...materia, progreso }
        })

        setMaterias(materiasConProgreso)

        const total = 4 * data.length
        const verificadas = data.reduce((acc, m) => acc + m.confirmadas, 0)
        const porcentajeCalculado = Math.round((verificadas / total) * 100)
        setPorcentaje(porcentajeCalculado)
      } catch (error) {
        console.error('Error al cargar progreso:', error)
      }
    }

    if (matricula) fetchMaterias()
  }, [matricula])

  return (
    <div className="student-panel">
      <aside className="sidebar">
        <div className="sidebar-title">Página principal</div>
        {materias.map((materia, idx) => (
          <button key={idx} className="materia-button">
            {materia.materia}
          </button>
        ))}
      </aside>

      <main className="panel-main">
        <div className="progress-indicator">
          <ProgressCircle percentage={porcentaje} />
        </div>

        <div className="materias-grid">
          {materias.map((materia, idx) => (
            <div className="materia-card" key={idx}>
              <h5>{materia.materia}</h5>
              <div className="barra-progreso">
                {materia.progreso.map((estado, i) => (
                  <div
                    key={i}
                    className={
                      estado === true
                        ? 'cuadro-verde'
                        : estado === false
                        ? 'cuadro-amarillo'
                        : 'cuadro-rojo'
                    }
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default StudentPanel
