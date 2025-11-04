import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Registrar from './pages/Registro';
import Header from './components/Header';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/registro' element= {<Registrar/>}/>
      <Route path='/header' element = {<Header/>}/>
    </Routes>
  );
};

export default App;