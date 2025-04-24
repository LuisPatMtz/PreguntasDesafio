import React, { useState, useRef } from 'react'
import ConfirmarPreguntas from '../components/ConfirmarPreguntas'
import EstadisticasMateria from './EstadisticasMateria'
import { CSSTransition } from 'react-transition-group'
import '../styles/Panel.css'

const AdminPanel = ({ totalPreguntas = 0, alumnosConPreguntas = 0 }) => {
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false)
  const confirmarRef = useRef(null)

  const handleVerTabla = () => {
    setMostrarConfirmar(!mostrarConfirmar)
    setMostrarEstadisticas(false)
  }

  const handlePorMateria = () => {
    setMostrarEstadisticas(!mostrarEstadisticas)
    setMostrarConfirmar(false)
  }

  const handleExportarPreguntas = async () => {
    try {
      const res = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/exportarConfirmadasRDS')
      if (!res.ok) throw new Error('Error al obtener el archivo')
      const blob = await res.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'preguntas_confirmadas.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('❌ Error al exportar preguntas:', error)
      alert('Hubo un problema al descargar el archivo.')
    }
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

          <button onClick={handlePorMateria}>
            {mostrarEstadisticas ? 'Ocultar estadísticas' : 'Estadísticas de preguntas por materia'}
          </button>

          <button onClick={handleExportarPreguntas}>
            Exportar preguntas confirmadas
          </button>
        </div>
      </div>

      {/* Sección de confirmación de preguntas */}
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

      {/* Sección de estadísticas */}
      {mostrarEstadisticas && (
        <div className="estadisticas-container">
          <EstadisticasMateria />
        </div>
      )}
    </div>
  )
}

export default AdminPanel
