import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        
        localStorage.setItem('role', data.role);
        localStorage.setItem('isLoggedIn', 'true'); 

        if (data.role === "admin") {
          console.log('Navegando para /admin');
          navigate('/admin');
        } else {
          console.log('Navegando para /');
          navigate('/home');
        }
      } else {
        setError('Falha no login.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Falha no login.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">Não tem uma conta? <Link to="/register" className="text-blue-500 hover:underline">Cadastre-se aqui</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
