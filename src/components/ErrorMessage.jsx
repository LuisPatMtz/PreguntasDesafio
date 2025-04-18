import React from 'react'

const ErrorMessage = ({ mensaje }) => (
  <div className="alert alert-danger text-center mt-3">
    {mensaje}
  </div>
)

export default ErrorMessage