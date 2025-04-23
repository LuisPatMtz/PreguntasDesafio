import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ materias, materiaSeleccionada }) => {
  const navigate = useNavigate()
  const matricula = localStorage.getItem('matricula')

  const handleClick = (nombreMateria) => {
    localStorage.setItem('materia_seleccionada', nombreMateria)
    if (matricula) {
      navigate(`/agregar-pregunta/${matricula}/${encodeURIComponent(nombreMateria)}`)
    } else {
      navigate('/')
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Materias</div>
      {materias.map((materia, idx) => {
        const nombre = materia.nombre || materia.materia
        return (
          <button
            key={idx}
            className={`materia-button ${nombre === materiaSeleccionada ? 'seleccionada' : ''}`}
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
