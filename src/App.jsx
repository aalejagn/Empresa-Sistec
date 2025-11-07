import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registrar from './pages/Registro';
import Header from './components/Header';
import Home from './pages/Homee';
import Login from './pages/Loginn';
import AcercaDe from './pages/acerca_de';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registro' element= {<Registrar />}/>
      <Route path ='/acerca_de' element={<AcercaDe />}/>
    </Routes>
  );
};

export default App;