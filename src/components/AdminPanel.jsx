import React from 'react'
import '../styles/Panel.css'

const AdminPanel = ({ totalPreguntas = 0, alumnosConPreguntas = 0 }) => {
  const handleVerTabla = () => {
    console.log("Ver tabla de preguntas")
  }

  const handlePorAlumno = () => {
    console.log("Estadísticas por alumno")
  }

  const handlePorSemestre = () => {
    console.log("Estadísticas por materia")
  }

  return (
    <div className="admin-panel">
      <div className="panel-container">
        <div className="panel-left">
          <h2 className="panel-title">Desafío jaguar - preguntas</h2>

          <div className="panel-metric">
            <p>Alumnos con preguntas</p>
            <span>{alumnosConPreguntas}</span>
          </div>

          <div className="panel-divider"></div>

          <div className="panel-metric">
            <p>Total de preguntas</p>
            <span>{totalPreguntas}</span>
          </div>
        </div>

        <div className="panel-right">
          <button onClick={handleVerTabla}>
            Ver tabla de preguntas
          </button>

          <button onClick={handlePorAlumno}>
            Estadísticas de preguntas por alumno
          </button>

          <button onClick={handlePorSemestre}>
            Estadísticas de preguntas por materia
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
