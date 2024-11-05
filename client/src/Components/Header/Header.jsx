import React from 'react'
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('isLoggedIn');
    navigate("/"); 
  };


  return (
    <nav className='bg-sky-100 py-4'>
      <ul className='flex justify-between px-8 '>
        <span className='flex gap-8'>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/carrinho'>Carrinho</Link></li>
          <li><Link to='/carrinho'>Meus Pedidos</Link></li>
        </span>

        <li className='text-xl font-bold'>JOIAS PRAGMA</li>

        <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 text-white bg-red-500 rounded-lg"
          >
            Sair
          </button>
      </ul>
    </nav>
  )
}

export default Header
