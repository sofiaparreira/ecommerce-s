// src/App.js
import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Register from './Pages/auth/Register';
import Home from './Pages/Home'; 
import HomeAdmin from './Pages/HomeAdmin';
import Adicionar from './Pages/Adicionar';
import Carrinho from './Pages/Carrinho';
import Login from './Pages/auth/Login';
import MeusPedidos from './Pages/MeusPedidos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/adicionar" element={<Adicionar />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/meusPedidos" element={<MeusPedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

