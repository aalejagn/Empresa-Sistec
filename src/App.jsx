import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registrar from './pages/Registro';
import Home from './pages/home';
import Login from './pages/login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registro' element= {<Registrar />}/>
    </Routes>
  );
};

export default App;