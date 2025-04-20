import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import '../styles/studentPanel.css'
import Header from '../components/Header'
import ProgressCircle from '../components/ProgressCircle'
import MateriaCard from '../components/MateriaCard'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import PreguntaForm from '../components/PreguntaForm'

const StudentPanel = () => {
  const { matricula } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [materias, setMaterias] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [toast, setToast] = useState(false)

  // Determinar si estamos en la vista principal del estudiante
  const enPaginaPrincipal = location.pathname === `/panel-estudiante/${matricula}`

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

  const handleClickProgreso = (nombreMateria) => {
    const materia = materias.find(m => m.materia === nombreMateria)
    console.log('👉 Materia seleccionada:', materia)
    if (materia && materia.total_preguntas < 4) {
      setMateriaSeleccionada(materia)
      setMostrarFormulario(true)
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
      <Header onLogoClick={() => navigate(`/panel-estudiante/${matricula}`)} />
      <div className="student-panel">
        <Sidebar
          materias={materias}
          materiaSeleccionada="" // no resaltar ninguna cuando estés en esta vista
        />

        <main className="panel-main">
          {toast && <div className="success-toast">✅ Pregunta guardada correctamente</div>}
          {loading && <Loader />}
          {error && <ErrorMessage mensaje={error} />}

          {!loading && !error && enPaginaPrincipal && (
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
            </>
          )}

          {mostrarFormulario && materiaSeleccionada && (
            <div className="formulario-overlay">
              <div className="formulario-contenido">
                <div className="formulario-header">
                  <h4>Agregar pregunta a {materiaSeleccionada.materia}</h4>
                  <button className="cerrar-modal" onClick={() => setMostrarFormulario(false)}>✖</button>
                </div>
                <PreguntaForm
                  materiaId={materiaSeleccionada.id} // ✅ pasamos por prop
                  onSubmit={handleGuardarPregunta}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default StudentPanel
