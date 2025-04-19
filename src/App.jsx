import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginRegistro from './pages/LoginRegistro'
import AdminPage from './pages/AdminPage'
import StudentPanel from './pages/StudentPanel'
import AgregarPregunta from './pages/AgregarPregunta' // ✅ Aquí lo importas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegistro />} />
        <Route path="/panel-admin" element={<AdminPage />} />
        <Route path="/panel-estudiante/:matricula" element={<StudentPanel />} />
        <Route path="/agregar-pregunta" element={<AgregarPregunta />} /> {/* ✅ Agrega la ruta */}
      </Routes>
    </Router>
  )
}

export default App
