import React from 'react'
import { Link } from 'react-router-dom'

export default function Finalizado() {
  return (
    <div>
      <p className='text-center mt-32 text-2xl'>Produto Comprado com sucesso!</p>
      <Link to='/home'>Voltar ao site</Link>
    </div>
  )
}
