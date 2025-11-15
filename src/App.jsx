import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homee";
import Login from "./pages/Loginn";
import Registrar from "./pages/Registro";
import AcercaDe from "./pages/AcercaDe";
import Contactanos from "./pages/Contactanos";
import Mision from "./pages/Mision";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import PoliticaDevolucion from "./pages/PoliticaDevolucion";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Ubicacion from "./pages/Ubicacion";
import Valores from "./pages/Valores";
import Vision from "./pages/Vision";
import Categorias from "./pages/Categorias";
import ScrollToTop from "./components/ScrollToTop";
import Carrito from "./pages/Carrito";

const App = () => {
  return (
    <>
      {/* Este componente se encarga de hacer scroll al inicio en cada cambio de ruta */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registrar />} />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/mision" element={<Mision />} />
        <Route path="/politicaprivacidad" element={<PoliticasPrivacidad />} />
        <Route path="/politicadevolucion" element={<PoliticaDevolucion />} />
        <Route path="/terminoscondiciones" element={<TerminosCondiciones />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/valores" element={<Valores />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path = "/carrito" element = {<Carrito />} />
      </Routes>
    </>
  );
};

export default App;