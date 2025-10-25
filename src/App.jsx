import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/inicio';
import AcercaDe from './pages/acerca-de';
import Categorias from './pages/categorias';
import PoliticaDevolucion from './pages/politica-devolucion';
import PoliticasPrivacidad from './pages/politicas-privacidad';
import Mision from './pages/mision';
import Contactanos from './pages/contactanos';
import Reseñas from './pages/reseñas';
import TerminosCondiciones from './pages/terminos-condiciones';
import Ubicacion from './pages/ubicacion';
import Valores from './pages/valores';
import Vision from './pages/vision';
import Login from './pages/login';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/politica-devolucion" element={<PoliticaDevolucion />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="/mision" element={<Mision />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/reseñas" element={<Reseñas />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/valores" element={<Valores />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div><h1>404 - Página no encontrada</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;