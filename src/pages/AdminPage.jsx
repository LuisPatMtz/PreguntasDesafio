import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import Header from '../components/Header'

const AdminPage = () => {
  const navigate = useNavigate()

  // Lee rol y nombre desde localStorage
  const tipoUsuario = localStorage.getItem('tipo_usuario')
  const rawNombre = localStorage.getItem('nombre_completo')

  // Sanitiza el nombre para evitar "undefined"
  const nombreUsuario =
    rawNombre && rawNombre.toLowerCase() !== 'undefined'
      ? rawNombre
      : 'Docente'

  const [totalPreguntas, setTotalPreguntas] = useState(0)
  const [alumnosConPreguntas, setAlumnosConPreguntas] = useState(0)

  useEffect(() => {
    // Si no es docente, redirige al login
    if (tipoUsuario !== 'docente') {
      navigate('/')
      return
    }

    const fetchDatos = async () => {
      try {
        const resPreg = await fetch(
          'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerTotalPreguntasRDS'
        )
        const { total: tot } = await resPreg.json()
        setTotalPreguntas(tot)

        const resAlu = await fetch(
          'https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerAlumnosConPreguntasRDS'
        )
        const { total: alu } = await resAlu.json()
        setAlumnosConPreguntas(Number(alu))
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error)
      }
    }

    fetchDatos()
  }, [navigate, tipoUsuario])

  // Mientras verifica rol, no renderiza nada
  if (tipoUsuario !== 'docente') return null

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
