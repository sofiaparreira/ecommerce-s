import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='bg-sky-100 py-4'>
      <ul className='flex justify-center'>
        <li className='text-xl font-bold'>JOIAS PRAGMA</li>
        <Link to=''></Link>
      </ul>
    </nav>
  )
}

export default Header
