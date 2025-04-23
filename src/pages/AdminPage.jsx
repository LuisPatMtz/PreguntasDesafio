import React, { useEffect, useState } from 'react'
import AdminPanel from '../components/AdminPanel'
import Header from '../components/Header'

const AdminPage = () => {
  const [totalPreguntas, setTotalPreguntas] = useState(0)
  const [alumnosConPreguntas, setAlumnosConPreguntas] = useState(0)

  const nombreUsuario = localStorage.getItem('nombre_completo') || 'Docente'

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPreguntas = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerTotalPreguntasRDS')
        const dataPreguntas = await resPreguntas.json()
        setTotalPreguntas(dataPreguntas.total)

        const resAlumnos = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerAlumnosConPreguntasRDS')
        const dataAlumnos = await resAlumnos.json()
        setAlumnosConPreguntas(Number(dataAlumnos.total))
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error)
      }
    }

    fetchDatos()
  }, [])

  return (
    <>
      <Header tipo="admin" nombre={nombreUsuario} />
      <AdminPanel
        totalPreguntas={totalPreguntas}
        alumnosConPreguntas={alumnosConPreguntas}
      />
    </>
  )
}

export default AdminPage
