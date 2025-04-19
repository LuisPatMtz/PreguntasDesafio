import React from 'react'

const MateriaCard = ({ nombre, progreso, onCuadroClick }) => {
  const handleClick = (estado) => {
    if (estado === null && onCuadroClick) {
      onCuadroClick(nombre)
    }
  }

  const getClassName = (estado) => {
    if (estado === true) return 'cuadro-verde'
    if (estado === false) return 'cuadro-amarillo'
    return 'cuadro-rojo'
  }

  return (
    <div className="materia-card">
      <h5>{nombre}</h5>
      <div className="barra-progreso">
        {progreso.map((estado, i) => (
          <div
            key={i}
            className={getClassName(estado)}
            onClick={() => handleClick(estado)}
            style={{ cursor: estado === null ? 'pointer' : 'default' }}
            title={estado === null ? 'Haz clic para agregar una pregunta' : ''}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default MateriaCard
