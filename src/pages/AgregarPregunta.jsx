import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import PreguntaForm from '../components/PreguntaForm'
import '../styles/SuccessToast.css'

const AgregarPregunta = () => {
  const { materia } = useParams()                         // <-- materia viene de la URL
  const nombreMateria = decodeURIComponent(materia)        // <-- Deskapea espacios
  const matricula = localStorage.getItem('matricula')     // <-- matrícula siempre de localStorage

  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mostrarToast, setMostrarToast] = useState(false)
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null)
  const [preguntas, setPreguntas] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!matricula) {
      navigate('/')
      return
    }

    const cargarDatos = async () => {
      try {
        // 1) Obtiene todas las materias
        const resM = await fetch(
          `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerMateriasPorSemestreRDS?matricula=${matricula}`
        )
        if (!resM.ok) throw new Error('Error al cargar materias')
        const dataM = await resM.json()
        if (!Array.isArray(dataM.materias)) throw new Error('Respuesta inesperada')
        setMaterias(dataM.materias)

        // 2) Busca la materia seleccionada por su nombre
        const encontrada = dataM.materias.find((m) => m.nombre === nombreMateria)
        if (!encontrada) throw new Error('Materia no encontrada')
        setMateriaSeleccionada(encontrada)

        // 3) Carga las preguntas de esa materia
        const resP = await fetch(
          `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerPreguntasPorMateriaRDS?matricula=${matricula}&materia_id=${encontrada.id}`
        )
        if (!resP.ok) throw new Error('Error al cargar preguntas')
        const dataP = await resP.json()
        setPreguntas(Array.isArray(dataP.preguntas) ? dataP.preguntas : [])
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar materias o preguntas.')
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [matricula, nombreMateria, navigate])

  const handleGuardarPregunta = async (pregunta) => {
    try {
      const res = await fetch(
        'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/guardarPreguntaRDS',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pregunta)
        }
      )
      const result = await res.json()

      if (!res.ok) {
        alert(`⚠️ Error: ${result.error || 'No se pudo guardar la pregunta.'}`)
        return
      }

      setMostrarToast(true)
      setTimeout(() => {
        // recarga solo preguntas
        window.location.reload()
      }, 2000)
    } catch (err) {
      console.error(err)
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
            <div className="success-toast">✅ Pregunta guardada con éxito</div>
          )}
          {loading && <Loader />}
          {error && <ErrorMessage mensaje={error} />}

          {!loading && !error && materiaSeleccionada && (
            <>
              <h2>📘 Preguntas en {materiaSeleccionada.nombre}</h2>

              {preguntas.length > 0 ? (
                <ul className="lista-preguntas">
                  {preguntas.map((p) => (
                    <li key={p.id}>
                      <strong>Enunciado:</strong> {p.enunciado}
                      <br />
                      <strong>Correcta:</strong> {p.opcion_correcta}
                      <br />
                      <strong>Justificación:</strong> {p.justificacion}
                      <br />
                      <strong>Estado:</strong>{' '}
                      {p.confirmada ? '✅ Confirmada' : '⏳ Pendiente'}
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay preguntas realizadas.</p>
              )}

              {preguntas.length < 4 && (
                <div className="formulario-pregunta" style={{ marginTop: 20 }}>
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
