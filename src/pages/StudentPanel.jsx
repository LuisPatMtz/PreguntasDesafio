import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/studentPanel.css'
import Header from '../components/Header'
import ProgressCircle from '../components/ProgressCircle'
import MateriaCard from '../components/MateriaCard'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import PreguntaForm from '../components/PreguntaForm'

const StudentPanel = () => {
  const [materias, setMaterias] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [toast, setToast] = useState(false)
  const [materiaDesdeSidebar, setMateriaDesdeSidebar] = useState(false)

  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  useEffect(() => {
    if (!matricula) {
      navigate('/')
      return
    }
    fetchMaterias()
  }, [matricula, navigate])

  useEffect(() => {
    const escFunction = (e) => {
      if (e.key === 'Escape') setMostrarFormulario(false)
    }
    document.addEventListener('keydown', escFunction)
    return () => document.removeEventListener('keydown', escFunction)
  }, [])

  const fetchMaterias = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerProgresoEstudianteRDS?matricula=${matricula}`
      )
      const data = await response.json()

      if (!Array.isArray(data.materias)) throw new Error('Respuesta inesperada')

      const materiasConProgreso = data.materias.map(m => ({
        ...m,
        progreso: Array.from({ length: 4 }).map((_, i) => {
          if (i < m.confirmadas) return true
          if (i < m.total_preguntas) return false
          return null
        })
      }))

      setMaterias(materiasConProgreso)
      setPorcentaje(data.progreso_general || 0)
    } catch (err) {
      console.error('❌ Error:', err)
      setError('No se pudo cargar el progreso del estudiante.')
    } finally {
      setLoading(false)
    }
  }

  const handleSeleccionMateria = (nombreMateria) => {
    const materia = materias.find(m => m.materia === nombreMateria)
    if (materia) {
      setMateriaSeleccionada(materia)
      setMostrarFormulario(false)
      setMateriaDesdeSidebar(true)
    }
  }

  const handleClickProgreso = (nombreMateria) => {
    const materia = materias.find(m => m.materia === nombreMateria)
    if (materia && materia.total_preguntas < 4) {
      setMateriaSeleccionada(materia)
      setMostrarFormulario(true)
      setMateriaDesdeSidebar(false)
    }
  }

  const handleGuardarPregunta = async (nuevaPregunta) => {
    try {
      const response = await fetch(
        'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/guardarPreguntaRDS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaPregunta)
        }
      )

      if (response.ok) {
        setToast(true)
        setTimeout(() => {
          setToast(false)
          setMostrarFormulario(false)
          fetchMaterias()
        }, 2000)
      } else {
        const err = await response.json()
        alert('⚠️ Error: ' + (err.error || 'No se pudo guardar'))
      }
    } catch (err) {
      alert('❌ Error al guardar la pregunta')
      console.error(err)
    }
  }

  return (
    <>
      <Header onLogoClick={() => setMateriaSeleccionada(null)} />
      <div className="student-panel">
        <Sidebar
          materias={materias}
          materiaSeleccionada={materiaDesdeSidebar ? materiaSeleccionada?.materia : ''}
          onSeleccionar={handleSeleccionMateria}
        />

        <main className="panel-main">
          {toast && <div className="success-toast">✅ Pregunta guardada correctamente</div>}
          {loading && <Loader />}
          {error && <ErrorMessage mensaje={error} />}

          {!loading && !error && (
            <>
              <div className="progress-indicator">
                <ProgressCircle porcentaje={porcentaje} />
              </div>

              <div className="materias-grid">
                {materias.map((materia, idx) => (
                  <MateriaCard
                    key={idx}
                    nombre={materia.materia}
                    progreso={materia.progreso}
                    onCuadroClick={() => handleClickProgreso(materia.materia)}
                  />
                ))}
              </div>

              {materiaDesdeSidebar && materiaSeleccionada && (
                <div style={{ marginTop: '30px', width: '100%' }}>
                  <h3>{materiaSeleccionada.materia}</h3>
                  <p>Aquí irán las preguntas hechas por el usuario (próximamente).</p>
                  {materiaSeleccionada.total_preguntas < 4 && (
                    <button
                      className="btn-guardar"
                      style={{ marginTop: '15px' }}
                      onClick={() => setMostrarFormulario(true)}
                    >
                      ➕ Agregar pregunta
                    </button>
                  )}
                </div>
              )}

              {mostrarFormulario && materiaSeleccionada && (
                <div className="formulario-overlay">
                  <div className="formulario-contenido">
                    <div className="formulario-header">
                      <h4>Agregar pregunta a {materiaSeleccionada.materia}</h4>
                      <button className="cerrar-modal" onClick={() => setMostrarFormulario(false)}>✖</button>
                    </div>
                    <PreguntaForm
                      materiaId={materiaSeleccionada.id}
                      onSubmit={handleGuardarPregunta}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default StudentPanel
