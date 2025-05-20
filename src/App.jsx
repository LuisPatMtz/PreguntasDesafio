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
        <Route path="/" element={<LoginRegistro />} />

        <Route path="/acciones-estudiante" element={<AccionesEstudiante />} />

        <Route path="/AdminPage" element={<AdminPage />} />

        <Route path="/panel-estudiante" element={<StudentPanel />} />

        <Route path="/agregar-pregunta/:materia" element={<AgregarPregunta />} />
      </Routes>
    </Router>
  )
}

export default App
