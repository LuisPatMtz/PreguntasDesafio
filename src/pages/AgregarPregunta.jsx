import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import PreguntaForm from '../components/PreguntaForm'
import '../styles/SuccessToast.css'

const AgregarPregunta = () => {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mostrarToast, setMostrarToast] = useState(false)
  const [materiaIdSeleccionada, setMateriaIdSeleccionada] = useState(null)
  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')
  const materiaSeleccionada = localStorage.getItem('materia_seleccionada')

  useEffect(() => {
    if (!matricula) {
      navigate('/')
      return
    }

    const fetchMaterias = async () => {
      try {
        const res = await fetch(`https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerMateriasPorSemestreRDS?matricula=${matricula}`)
        const data = await res.json()

        if (!Array.isArray(data.materias)) {
          throw new Error('Formato inesperado')
        }

        setMaterias(data.materias)

        const materiaEncontrada = data.materias.find(m => m.nombre === materiaSeleccionada)
        if (materiaEncontrada) {
          setMateriaIdSeleccionada(materiaEncontrada.id)
        } else {
          setError('Materia no encontrada.')
        }
      } catch (err) {
        console.error('Error al obtener materias:', err)
        setError('No se pudieron cargar las materias.')
      } finally {
        setLoading(false)
      }
    }

    fetchMaterias()
  }, [matricula, navigate, materiaSeleccionada])

  const handleGuardarPregunta = async (pregunta) => {
    try {
      const response = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/guardarPreguntaRDS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pregunta)
      })

      const resultado = await response.json()

      if (response.ok) {
        setMostrarToast(true)
        setTimeout(() => {
          navigate('/panel-estudiante')
        }, 3000)
      } else {
        alert(`⚠️ Error: ${resultado.error || 'No se pudo guardar la pregunta.'}`)
      }
    } catch (err) {
      console.error('❌ Error al guardar pregunta:', err)
      alert('❌ Ocurrió un error al conectar con el servidor.')
    }
  }

  return (
    <>
      <Header />
      <div className="student-panel">
        <Sidebar materias={materias} />

        <main className="panel-main">
          {mostrarToast && (
            <div className="success-toast">
              ✅ Pregunta guardada con éxito
            </div>
          )}

          {loading && <Loader />}
          {error && <ErrorMessage mensaje={error} />}

          {!loading && !error && materiaIdSeleccionada && (
            <div className="formulario-pregunta">
              <h2>Agregar nueva pregunta</h2>
              <PreguntaForm materiaId={materiaIdSeleccionada} onSubmit={handleGuardarPregunta} />
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default AgregarPregunta
