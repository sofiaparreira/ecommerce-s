import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('user');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
          role,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Registro bem-sucedido! Você pode fazer login agora.');
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao registrar', error);
      setErrorMessage('Erro ao registrar. Tente novamente.');
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.checked ? 'admin' : 'user');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={register} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>

        {successMessage && (
          <p className="mt-4 text-green-600 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
        )}

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
          <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="senha">
            Senha
          </label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="senha"
            id="senha"
            name="senha"
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
        
        <p className="mt-4 text-center">
          Já possui uma conta? 
          <span 
            onClick={() => navigate('/login')} 
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
