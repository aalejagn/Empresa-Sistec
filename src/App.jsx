// App.jsx (actualizado completo)
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Homee';
import Login from './pages/Loginn';
import Registrar from './pages/Registro';
import AcercaDe from './pages/AcercaDe';
import Contactanos from './pages/Contactanos';
import Mision from './pages/Mision';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import PoliticaDevolucion from './pages/PoliticaDevolucion';
import TerminosCondiciones from './pages/TerminosCondiciones';
import Ubicacion from './pages/Ubicacion';
import Valores from './pages/Valores';
import Vision from './pages/Vision';
import Categorias from './pages/Categorias';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset overflow y scroll to top en cada route change
    document.body.style.overflow = '';
    window.scrollTo(0, 0);
  }, [location.pathname]);  // Ejecuta solo cuando pathname cambia

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registro' element= {<Registrar />} />
      <Route path ='/acercade' element={<AcercaDe />} />
      <Route path='/contactanos' element = {<Contactanos />} />
      <Route path='/mision' element = {<Mision />} />
      <Route path='/politicaprivacidad' element = {<PoliticasPrivacidad />} />
      <Route path='/politicadevolucion' element = {<PoliticaDevolucion />} />
      <Route path='/terminoscondiciones' element = {<TerminosCondiciones />} />
      <Route path='/ubicacion' element = {<Ubicacion />} />
      <Route path='/valores' element = {<Valores />} />
      <Route path='/vision' element = {<Vision />} />
      <Route path='/categorias' element = {<Categorias />} />
    </Routes>
  );
};

export default App;