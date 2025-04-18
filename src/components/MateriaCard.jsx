import React from 'react';
import styles from '../styles/MateriaCard.module.css';

const MateriaCard = ({ nombre, progreso }) => {
  // progreso debe ser un objeto como: { rojo: 1, amarillo: 1, verde: 2 }
  const maxBoxes = 4;
  const { rojo = 0, amarillo = 0, verde = 0 } = progreso;

  const renderBoxes = () => {
    const boxes = [];

    for (let i = 0; i < rojo; i++) {
      boxes.push(<div key={`rojo-${i}`} className={`${styles.box} ${styles.rojo}`} />);
    }
    for (let i = 0; i < amarillo; i++) {
      boxes.push(<div key={`amarillo-${i}`} className={`${styles.box} ${styles.amarillo}`} />);
    }
    for (let i = 0; i < verde; i++) {
      boxes.push(<div key={`verde-${i}`} className={`${styles.box} ${styles.verde}`} />);
    }

    // Rellenar con cajas vacías si faltan
    while (boxes.length < maxBoxes) {
      boxes.push(<div key={`vacio-${boxes.length}`} className={`${styles.box} ${styles.vacio}`} />);
    }

    return boxes;
  };

  const porcentaje = Math.round((verde / maxBoxes) * 100);

  return (
    <div className={styles.materiaCard}>
      <h5 className={styles.titulo}>{nombre}</h5>
      <div className={styles.progresoBarra}>{renderBoxes()}</div>
      <p className={styles.porcentaje}>{porcentaje}% Completado</p>
    </div>
  );
};

export default MateriaCard;
