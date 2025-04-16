import React, { useEffect, useState } from 'react'
import AdminPanel from '../components/AdminPanel'

const AdminPage = () => {
  const [totalPreguntas, setTotalPreguntas] = useState(0)
  const [alumnosSinPreguntar, setAlumnosSinPreguntar] = useState(0)

  useEffect(() => {
    // Aquí haces las llamadas directas a tu API Lambda o a tu backend
    const fetchDatos = async () => {
      try {
        const resPreguntas = await fetch('https://tuapi.com/total-preguntas')
        const dataPreguntas = await resPreguntas.json()
        setTotalPreguntas(dataPreguntas.total)

        const resAlumnos = await fetch('https://tuapi.com/alumnos-sin-preguntar')
        const dataAlumnos = await resAlumnos.json()
        setAlumnosSinPreguntar(dataAlumnos.total)
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error)
      }
    }

    fetchDatos()
  }, [])

  return (
    <AdminPanel
      totalPreguntas={totalPreguntas}
      alumnosSinPreguntar={alumnosSinPreguntar}
    />
  )
}

export default AdminPage
