import React from 'react'

const Sidebar = ({ materias, materiaSeleccionada, onSeleccionar }) => {
  const handleClick = (nombreMateria) => {
    localStorage.setItem('materia_seleccionada', nombreMateria)
    onSeleccionar(nombreMateria)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Materias</div>
      {materias.map((materia, idx) => (
        <button
          key={idx}
          className={`materia-button ${materia.materia === materiaSeleccionada ? 'seleccionada' : ''}`}
          onClick={() => handleClick(materia.materia)}
        >
          {materia.materia}
        </button>
      ))}
    </aside>
  )
}

export default Sidebar
