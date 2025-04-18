import React from 'react'

const Sidebar = ({ materias }) => (
  <aside className="sidebar">
    <div className="sidebar-title">Página principal</div>
    {materias.map((materia, idx) => (
      <button key={idx} className="materia-button">
        {materia.materia}
      </button>
    ))}
  </aside>
)

export default Sidebar