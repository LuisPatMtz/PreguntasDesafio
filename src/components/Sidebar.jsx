import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ materias, materiaSeleccionada }) => {
  const navigate = useNavigate()

  const handleClick = (nombreMateria) => {
    // guardamos en localStorage (opcional, puedes prescindir de eso)
    localStorage.setItem('materia_seleccionada', nombreMateria)
    // navegamos solo con la materia
    navigate(`/agregar-pregunta/${encodeURIComponent(nombreMateria)}`)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Materias</div>
      {materias.map((m, idx) => {
        const nombre = m.nombre || m.materia
        return (
          <button
            key={idx}
            className={`materia-button ${
              nombre === materiaSeleccionada ? 'seleccionada' : ''
            }`}
            onClick={() => handleClick(nombre)}
          >
            {nombre}
          </button>
        )
      })}
    </aside>
  )
}

export default Sidebar
