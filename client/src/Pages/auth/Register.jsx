import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('user');

  const register = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/user/register', {
        email: email,
        password: senha, 
        role, 
      });

      navigate("/");
    } catch (error) {
      console.error('Erro ao registrar', error);
    }
  };

  const handleRoleChange = (e) => {
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={register} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
            E-mail
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
            Senha
          </label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="role"
            name="role"
            onChange={handleRoleChange} 
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700" htmlFor="role">
            Registrar como Administrador
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default Register;
