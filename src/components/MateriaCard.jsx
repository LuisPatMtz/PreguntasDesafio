import React from 'react'

const MateriaCard = ({ nombre, progreso }) => (
  <div className="materia-card">
    <h5>{nombre}</h5>
    <div className="barra-progreso">
      {progreso.map((estado, i) => (
        <div
          key={i}
          className={
            estado === true
              ? 'cuadro-verde'
              : estado === false
              ? 'cuadro-amarillo'
              : 'cuadro-rojo'
          }
        ></div>
      ))}
    </div>
  </div>
)

export default MateriaCard