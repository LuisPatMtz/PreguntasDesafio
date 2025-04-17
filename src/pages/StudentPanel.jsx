import React from 'react'
import '../styles/studentPanel.css'
import ProgressCircle from '../components/ProgressCircle'

const materiasEjemplo = [
  {
    nombre: 'Cálculo Integral',
    progreso: [true, false, false, false], // verde, rojo, rojo, rojo
  },
  {
    nombre: 'Programación Orientada a Objetos',
    progreso: [true, true, false, false],
  },
  {
    nombre: 'Contabilidad Financiera',
    progreso: [true, true, true, false],
  },
  {
    nombre: 'Sistemas Operativos',
    progreso: [true, true, true, true],
  },
]

const StudentPanel = () => {
  // Simulación de porcentajes para el círculo (de 0 a 100)
  const totalPreguntas = 4 * materiasEjemplo.length
  const preguntasVerificadas = materiasEjemplo.reduce(
    (acc, materia) => acc + materia.progreso.filter(p => p === true).length,
    0
  )
  const porcentaje = Math.round((preguntasVerificadas / totalPreguntas) * 100)

  return (
    <div className="student-panel">
      <aside className="sidebar">
        <div className="sidebar-title">Página principal</div>
        {materiasEjemplo.map((materia, idx) => (
          <button key={idx} className="materia-button">{materia.nombre}</button>
        ))}
      </aside>

      <main className="panel-main">
        <div className="progress-indicator">
          <ProgressCircle percentage={porcentaje} />
        </div>

        <div className="materias-grid">
          {materiasEjemplo.map((materia, idx) => (
            <div className="materia-card" key={idx}>
              <h5>{materia.nombre}</h5>
              <div className="barra-progreso">
                {materia.progreso.map((estado, i) => (
                  <div
                    key={i}
                    className={
                      estado === true
                        ? 'cuadro-verde'
                        : i <= 1
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
