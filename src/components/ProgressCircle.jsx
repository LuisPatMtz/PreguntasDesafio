import React from 'react'

const ProgressCircle = ({ porcentaje }) => {
  const radio = 40
  const circunferencia = 2 * Math.PI * radio
  const progreso = (porcentaje / 100) * circunferencia

  const getStrokeColor = () => {
    if (porcentaje >= 75) return '#28a745'
    if (porcentaje >= 50) return '#ffc107'
    return '#dc3545'
  }

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
          stroke={getStrokeColor()}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text
          x="50"
          y="55"
          className="circle-text"
          transform="rotate(90 50 50)"
        >
          {porcentaje}%
        </text>
      </svg>
    </div>
  )
}

export default ProgressCircle
