import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginRegistro from './pages/LoginRegistro'
import AccionesEstudiante from './pages/AccionesEstudiante'
import AdminPage from './pages/AdminPage'
import StudentPanel from './pages/StudentPanel'
import AgregarPregunta from './pages/AgregarPregunta'

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<LoginRegistro />} />

        {/* Acciones del estudiante (sin matrícula en URL) */}
        <Route path="/acciones-estudiante" element={<AccionesEstudiante />} />

        {/* Panel del docente */}
        <Route path="/AdminPage" element={<AdminPage />} />

        {/* Panel del estudiante (sin matrícula en URL) */}
        <Route path="/panel-estudiante" element={<StudentPanel />} />

        {/* Agregar preguntas: sólo materia en la ruta */}
        <Route path="/agregar-pregunta/:materia" element={<AgregarPregunta />} />
      </Routes>
    </Router>
  )
}

export default App
