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

        {/* Acciones del estudiante */}
        <Route path="/acciones-estudiante" element={<AccionesEstudiante />} />
        <Route path="/acciones-estudiante/:matricula" element={<AccionesEstudiante />} />

        {/* Panel del docente */}
        <Route path="/panel-admin" element={<AdminPage />} />

        {/* Panel del estudiante */}
        <Route path="/panel-estudiante" element={<StudentPanel />} />
        <Route path="/panel-estudiante/:matricula" element={<StudentPanel />} />

        {/* Agregar preguntas */}
        <Route path="/agregar-pregunta/:materia" element={<AgregarPregunta />} />
        <Route path="/agregar-pregunta/:matricula/:materia" element={<AgregarPregunta />} />
      </Routes>
    </Router>
  )
}

export default App
