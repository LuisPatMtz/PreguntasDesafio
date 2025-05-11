import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import Header from '../components/Header'

const AdminPage = () => {
  const navigate = useNavigate()
  const nombreUsuario = localStorage.getItem('nombre_completo')

  const [totalPreguntas, setTotalPreguntas] = useState(0)
  const [alumnosConPreguntas, setAlumnosConPreguntas] = useState(0)

  useEffect(() => {
    // Si no hay nombre en localStorage, volvemos al login
    if (!nombreUsuario) {
      navigate('/')
      return
    }

    const fetchDatos = async () => {
      try {
        const resPreguntas = await fetch(
          'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerTotalPreguntasRDS'
        )
        const dataPreguntas = await resPreguntas.json()
        setTotalPreguntas(dataPreguntas.total)

        const resAlumnos = await fetch(
          'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerAlumnosConPreguntasRDS'
        )
        const dataAlumnos = await resAlumnos.json()
        setAlumnosConPreguntas(Number(dataAlumnos.total))
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error)
      }
    }

    fetchDatos()
  }, [navigate, nombreUsuario])

  // Mientras redirige, no renderizamos nada
  if (!nombreUsuario) return null

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
