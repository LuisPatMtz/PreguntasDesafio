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
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [matricula, setMatricula] = useState(null)
  const [materias, setMaterias] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [toast, setToast] = useState(false)

  // Determina si estamos en la vista principal
  const enPaginaPrincipal =
    location.pathname === '/panel-estudiante' ||
    location.pathname === `/panel-estudiante/${params?.materia}`

  // Obtener matrícula desde URL o localStorage
  useEffect(() => {
    const urlMat = params?.matricula || params?.materia
    const stored = localStorage.getItem('matricula')
    if (urlMat) {
      setMatricula(urlMat)
    } else if (stored) {
      setMatricula(stored)
    } else {
      alert('⚠️ Sesión expirada. Inicia sesión de nuevo.')
      navigate('/')
    }
  }, [params, navigate])

  // Cargar progreso cuando haya matrícula
  useEffect(() => {
    if (matricula) fetchMaterias()
  }, [matricula])

  // Escape cierra formulario
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setMostrarFormulario(false)
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  const fetchMaterias = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerProgresoEstudianteRDS?matricula=${matricula}`
      )
      if (!res.ok) throw new Error('Error al cargar progreso')
      const data = await res.json()
      if (!Array.isArray(data.materias)) throw new Error('Respuesta inesperada')
      const list = data.materias.map((m) => ({
        ...m,
        progreso: Array.from({ length: 4 }).map((_, i) => {
          if (i < m.confirmadas) return true
          if (i < m.total_preguntas) return false
          return null
        })
      }))
      setMaterias(list)
      setPorcentaje(data.progreso_general || 0)
    } catch (e) {
      console.error(e)
      setError('No se pudo cargar el progreso del estudiante.')
    } finally {
      setLoading(false)
    }
  }

  // Al hacer click en sidebar o en tarjeta, selecciona materia
  const handleSelectMateria = (nombre) => {
    const sel = materias.find((m) => m.materia === nombre)
    if (!sel) {
      console.warn('Materia no encontrada:', nombre)
      return
    }
    setMateriaSeleccionada(sel)
    // solo abrir formulario si faltan preguntas
    if (sel.total_preguntas < 4) setMostrarFormulario(true)
  }

  const handleGuardarPregunta = async (nuevaPregunta) => {
    try {
      const res = await fetch(
        'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/guardarPreguntaRDS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaPregunta)
        }
      )
      if (!res.ok) {
        const err = await res.json()
        alert('⚠️ Error: ' + (err.error || 'No se pudo guardar'))
        return
      }
      setToast(true)
      setTimeout(() => {
        setToast(false)
        setMostrarFormulario(false)
        fetchMaterias()
      }, 2000)
    } catch (e) {
      console.error(e)
      alert('❌ Error al guardar la pregunta')
    }
  }

  return (
    <>
      <Header onLogoClick={() => navigate('/panel-estudiante')} />
      <div className="student-panel">
        <Sidebar
          materias={materias}
          materiaSeleccionada={materiaSeleccionada?.materia || ''}
          onSelect={handleSelectMateria}
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
                {materias.map((m, i) => (
                  <MateriaCard
                    key={i}
                    nombre={m.materia}
                    progreso={m.progreso}
                    onCuadroClick={() => handleSelectMateria(m.materia)}
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
                  <button
                    className="cerrar-modal"
                    onClick={() => setMostrarFormulario(false)}
                  >
                    ✖
                  </button>
                </div>
                <PreguntaForm
                  materiaId={materiaSeleccionada.id}
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
