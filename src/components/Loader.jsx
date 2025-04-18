import React from 'react'

const Loader = () => (
  <div className="loader text-center mt-4">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <p className="mt-2">Cargando progreso del estudiante...</p>
  </div>
)

export default Loader