import React from 'react'
import '../styles/Panel.css'

const AdminPanel = ({ totalPreguntas = 0, alumnosSinPreguntar = 0 }) => {
  const handleVerTabla = () => {
    // Aquí puedes redirigir o mostrar el componente con la tabla de preguntas
    console.log("Ver tabla de preguntas")
  }

  const handlePorAlumno = () => {
    // Aquí puedes redirigir o mostrar estadísticas por alumno
    console.log("Estadísticas por alumno")
  }

  const handlePorSemestre = () => {
    // Aquí puedes redirigir o mostrar estadísticas por semestre
    console.log("Estadísticas por semestre")
  }

  return (
    <div className="admin-panel">
      <div className="panel-container">
        <div className="panel-left">
          <h2 className="panel-title">Desafío jaguar - preguntas</h2>

          <div className="panel-metric">
            <p>Alumnos sin hacer preguntas</p>
            <span>{alumnosSinPreguntar}</span>
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
