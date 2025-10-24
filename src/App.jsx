// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AcercaDe from './pages/AcercaDe';
import Categorias from './pages/Categorias';
import PoliticaDevolucion from './pages/PoliticaDevolucion';
import Mision from './pages/Mision';
import Contactanos from './pages/Contactanos';
import Reseñas from './pages/Reseñas';
import Login from './Login'; // Corrección: sin .jsx y sin src/ adicional

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AcercaDe />} />
        <Route path="/acerca-de" element={<AcercaDe />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/politica-devolucion" element={<PoliticaDevolucion />} />
        <Route path="/mision" element={<Mision />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/login" element={<Login />} /> {/* Ruta correcta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;