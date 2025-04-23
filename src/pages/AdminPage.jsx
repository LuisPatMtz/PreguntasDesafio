import React, { useEffect, useState } from 'react'
import AdminPanel from '../components/AdminPanel'

const AdminPage = () => {
  const [totalPreguntas, setTotalPreguntas] = useState(0)
  const [alumnosConPreguntas, setAlumnosConPreguntas] = useState(0)

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPreguntas = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerTotalPreguntasRDS')
        const dataPreguntas = await resPreguntas.json()
        setTotalPreguntas(dataPreguntas.total)

        const resAlumnos = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerAlumnosConPreguntasRDS')
        const dataAlumnos = await resAlumnos.json()
        setAlumnosConPreguntas(Number(dataAlumnos.total)) // por si viene como string
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error)
      }
    }

    fetchDatos()
  }, [])

  return (
    <AdminPanel
      totalPreguntas={totalPreguntas}
      alumnosConPreguntas={alumnosConPreguntas}
    />
  )
}

export default AdminPage
