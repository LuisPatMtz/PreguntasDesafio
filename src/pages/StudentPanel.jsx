import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/studentPanel.css'
import Header from '../components/Header'
import ProgressCircle from '../components/ProgressCircle'
import MateriaCard from '../components/MateriaCard'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const StudentPanel = () => {
  const [materias, setMaterias] = useState([])
  const [porcentaje, setPorcentaje] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  useEffect(() => {
    if (!matricula) {
      navigate('/')
      return
    }

    const fetchMaterias = async () => {
      try {
        const response = await fetch(
          `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerProgresoEstudianteRDS?matricula=${matricula}`
        )
        const data = await response.json()

        if (!Array.isArray(data.materias)) {
          throw new Error("Respuesta inesperada del servidor.")
        }

        const materiasConProgreso = data.materias.map(materia => ({
          ...materia,
          progreso: Array.from({ length: 4 }).map((_, i) => {
            if (i < materia.confirmadas) return true
            if (i < materia.total_preguntas) return false
            return null
          })
        }))

        setMaterias(materiasConProgreso)
        setPorcentaje(data.progreso_general || 0)
      } catch (err) {
        console.error('❌ Error al cargar progreso:', err)
        setError('No se pudo cargar el progreso del estudiante.')
      } finally {
        setLoading(false)
      }
    }

    fetchMaterias()
  }, [matricula, navigate])

  return (
    <>
      <Header />
      <div className="student-panel">
        <Sidebar materias={materias} />

        <main className="panel-main">
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
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default StudentPanel
