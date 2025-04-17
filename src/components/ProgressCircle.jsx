import React from 'react';
import '../styles/ProgressCircle.css';

const ProgressCircle = ({ porcentaje }) => {
    const radio = 40
    const circunferencia = 2 * Math.PI * radio
    const progreso = (porcentaje / 100) * circunferencia
  
    return (
      <div className="progress-circle-container">
        <svg width="100" height="100" className="progress-circle">
          <circle
            className="circle-bg"
            cx="50"
            cy="50"
            r={radio}
            strokeWidth="10"
          />
          <circle
            className="circle-progress"
            cx="50"
            cy="50"
            r={radio}
            strokeWidth="10"
            strokeDasharray={circunferencia}
            strokeDashoffset={circunferencia - progreso}
          />
          <text x="50" y="55" textAnchor="middle" className="circle-text">
            {porcentaje}%
          </text>
        </svg>
      </div>
    )
  }
  
  export default ProgressCircle
  