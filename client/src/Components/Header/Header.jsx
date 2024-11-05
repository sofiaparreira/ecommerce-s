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
      <ul className='flex justify-center'>
        <li className='text-xl font-bold'>JOIAS PRAGMA</li>
        <Link to=''></Link>
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
