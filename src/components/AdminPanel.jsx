import React, { useState, useRef } from 'react'
import ConfirmarPreguntas from '../components/ConfirmarPreguntas'
import Header from '../components/Header'
import { CSSTransition } from 'react-transition-group'
import '../styles/Panel.css'

const AdminPanel = ({ totalPreguntas = 0, alumnosConPreguntas = 0 }) => {
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const confirmarRef = useRef(null)

  const handleVerTabla = () => {
    setMostrarConfirmar(!mostrarConfirmar)
  }

  const handlePorAlumno = () => {
    console.log("Estadísticas de preguntas por alumno")
  }

  const handlePorSemestre = () => {
    console.log("Estadísticas de preguntas por materia")
  }

  return (
    <div className="admin-panel">
      <div className="panel-container">
        <div className="panel-left">
          <h2 className="panel-title">Hola, ¡revisemos el progreso!</h2>

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
            {mostrarConfirmar ? 'Ocultar preguntas' : 'Confirmar preguntas'}
          </button>

          <button onClick={handlePorAlumno}>
            Estadísticas de preguntas por alumno
          </button>

          <button onClick={handlePorSemestre}>
            Estadísticas de preguntas por materia
          </button>

          <CSSTransition
            in={mostrarConfirmar}
            timeout={400}
            classNames="fade-slide"
            unmountOnExit
            nodeRef={confirmarRef}
          >
            <div ref={confirmarRef}>
              <ConfirmarPreguntas />
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
