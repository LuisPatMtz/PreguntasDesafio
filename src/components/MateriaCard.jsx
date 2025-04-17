import React from 'react';
import '../styles/studentPanel.css';

const MateriaCard = ({ nombre, progreso }) => {
    // progreso debe ser un objeto como: { rojo: 1, amarillo: 1, verde: 2 }
    const total = 4;
    const { rojo = 0, amarillo = 0, verde = 0 } = progreso;
  
    const renderBoxes = () => {
      const boxes = [];
  
      for (let i = 0; i < rojo; i++) {
        boxes.push(<div key={`rojo-${i}`} className="box rojo"></div>);
      }
      for (let i = 0; i < amarillo; i++) {
        boxes.push(<div key={`amarillo-${i}`} className="box amarillo"></div>);
      }
      for (let i = 0; i < verde; i++) {
        boxes.push(<div key={`verde-${i}`} className="box verde"></div>);
      }
  
      // Rellenar los que falten si el total es menor a 4 por error en los datos
      while (boxes.length < total) {
        boxes.push(<div key={`vacio-${boxes.length}`} className="box vacio"></div>);
      }
  
      return boxes;
    };
  
    return (
      <div className="materia-card">
        <h5>{nombre}</h5>
        <div className="progreso-barra">
          {renderBoxes()}
        </div>
      </div>
    );
  };
  
  export default MateriaCard;