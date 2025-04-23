// src/pages/AgregarPregunta.jsx
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
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [preguntas, setPreguntas] = useState([])

  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')
  const nombreMateria = localStorage.getItem('materia_seleccionada')

  useEffect(() => {
    if (!matricula) {
      navigate('/')
      return
    }

    const fetchMateriasYSeleccionada = async () => {
      try {
        const res = await fetch(`https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerMateriasPorSemestreRDS?matricula=${matricula}`)
        const data = await res.json()

        if (!Array.isArray(data.materias)) throw new Error('Formato inesperado')

        setMaterias(data.materias)

        const encontrada = data.materias.find(m => m.nombre === nombreMateria)
        if (!encontrada) throw new Error('Materia no encontrada.')

        setMateriaSeleccionada(encontrada)
        await fetchPreguntas(encontrada.id)
      } catch (err) {
        console.error('❌ Error:', err)
        setError('No se pudieron cargar las materias o preguntas.')
      } finally {
        setLoading(false)
      }
    }

    const fetchPreguntas = async (materiaId) => {
      try {
        const res = await fetch(`https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerPreguntasPorMateriaRDS?matricula=${matricula}&materia_id=${materiaId}`)
        const data = await res.json()
        setPreguntas(data.preguntas || [])
      } catch (err) {
        console.error('❌ Error al obtener preguntas:', err)
      }
    }

    fetchMateriasYSeleccionada()
  }, [matricula, navigate, nombreMateria])

  const handleGuardarPregunta = async (pregunta) => {
    try {
      const res = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/guardarPreguntaRDS', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pregunta)
      })

      const result = await res.json()

      if (res.ok) {
        setMostrarToast(true)
        setTimeout(() => window.location.reload(), 2000)
      } else {
        alert(`⚠️ Error: ${result.error || 'No se pudo guardar la pregunta.'}`)
      }
    } catch (err) {
      console.error('❌ Error al guardar:', err)
      alert('❌ Ocurrió un error al conectar con el servidor.')
    }
  }

  return (
    <>
      <Header />
      <div className="student-panel">
        <Sidebar
          materias={materias}
          materiaSeleccionada={materiaSeleccionada?.nombre}
        />

        <main className="panel-main">
          {mostrarToast && (
            <div className="success-toast">
              ✅ Pregunta guardada con éxito
            </div>
          )}

          {loading && <Loader />}
          {error && <ErrorMessage mensaje={error} />}

          {!loading && !error && materiaSeleccionada && (
            <>
              <h2>📘 Preguntas realizadas en {materiaSeleccionada.nombre}</h2>

              {preguntas.length > 0 ? (
                <ul className="lista-preguntas">
                  {preguntas.map(p => (
                    <li key={p.id}>
                      <strong>Enunciado:</strong> {p.enunciado}<br />
                      <strong>Correcta:</strong> {p.opcion_correcta}<br />
                      <strong>Justificación:</strong> {p.justificacion}<br />
                      <strong>Estado:</strong> {p.confirmada ? '✅ Confirmada' : '⏳ Pendiente'}
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay preguntas realizadas.</p>
              )}

              {preguntas.length < 4 && (
                <div className="formulario-pregunta" style={{ marginTop: '20px' }}>
                  <h3>➕ Agregar nueva pregunta</h3>
                  <PreguntaForm
                    materiaId={materiaSeleccionada.id}
                    onSubmit={handleGuardarPregunta}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default AgregarPregunta
