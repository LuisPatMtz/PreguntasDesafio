// src/components/PreguntaForm.jsx
import React, { useState, useEffect } from 'react'
import '../styles/preguntaForm.css'


const PreguntaForm = ({ onSubmit }) => {
  const [materiaId, setMateriaId] = useState(null)
  const [enunciado, setEnunciado] = useState('')
  const [opciones, setOpciones] = useState({
    incorrecta1: '',
    incorrecta2: '',
    incorrecta3: '',
    correcta: '',
  })
  const [justificacion, setJustificacion] = useState('')
  const [error, setError] = useState(null)

  const matricula = localStorage.getItem('matricula')
  const materiaNombre = localStorage.getItem('materia_seleccionada')

  useEffect(() => {
    const fetchMateriaId = async () => {
      try {
        const res = await fetch(
          `https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerMateriasPorSemestreRDS?matricula=${matricula}`
        )
        const data = await res.json()

        const materia = data.materias.find(m => m.nombre === materiaNombre)
        if (!materia) {
          setError('Materia no encontrada')
          return
        }

        setMateriaId(materia.id)
      } catch (err) {
        setError('Error al cargar la materia')
      }
    }

    fetchMateriaId()
  }, [materiaNombre, matricula])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!materiaId) {
      setError('No se ha podido asociar la materia')
      return
    }

    const nuevaPregunta = {
      materia_id: materiaId,
      autor_matricula: matricula,
      enunciado,
      opcion_incorrecta_1: opciones.incorrecta1,
      opcion_incorrecta_2: opciones.incorrecta2,
      opcion_incorrecta_3: opciones.incorrecta3,
      opcion_correcta: opciones.correcta,
      justificacion
    }

    onSubmit(nuevaPregunta)

    // Limpiar campos
    setEnunciado('')
    setOpciones({
      incorrecta1: '',
      incorrecta2: '',
      incorrecta3: '',
      correcta: ''
    })
    setJustificacion('')
    setError(null)
  }

  return (
    <form className="formulario-pregunta" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <label>Enunciado</label>
      <textarea
        value={enunciado}
        onChange={(e) => setEnunciado(e.target.value)}
        required
        rows={3}
      />

      <label>Opción incorrecta 1</label>
      <input
        type="text"
        value={opciones.incorrecta1}
        onChange={(e) => setOpciones({ ...opciones, incorrecta1: e.target.value })}
        required
      />

      <label>Opción incorrecta 2</label>
      <input
        type="text"
        value={opciones.incorrecta2}
        onChange={(e) => setOpciones({ ...opciones, incorrecta2: e.target.value })}
        required
      />

      <label>Opción incorrecta 3</label>
      <input
        type="text"
        value={opciones.incorrecta3}
        onChange={(e) => setOpciones({ ...opciones, incorrecta3: e.target.value })}
        required
      />

      <label>Opción correcta</label>
      <input
        type="text"
        value={opciones.correcta}
        onChange={(e) => setOpciones({ ...opciones, correcta: e.target.value })}
        required
      />

      <label>Justificación</label>
      <textarea
        value={justificacion}
        onChange={(e) => setJustificacion(e.target.value)}
        rows={2}
        required
      />

      <button type="submit" className="btn-guardar">
        Guardar pregunta
      </button>
    </form>
  )
}

export default PreguntaForm
