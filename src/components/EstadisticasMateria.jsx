import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const EstadisticasMateria = () => {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch('https://v62mxrdy3g.execute-api.us-east-1.amazonaws.com/prod/obtenerEstadisticasPorMateriaRDS')
        const data = await res.json()
        setDatos(data)
      } catch (err) {
        console.error('❌ Error al obtener estadísticas:', err)
      }
    }

    fetchEstadisticas()
  }, [])

  return (
    <div className="grafica-wrapper">
      <h3 className="grafica-title">Estadísticas de preguntas por materia</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="materia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="confirmadas" fill="#198754" name="✅ Verificadas" />
          <Bar dataKey="no_confirmadas" fill="#dc3545" name="❌ No verificadas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EstadisticasMateria
