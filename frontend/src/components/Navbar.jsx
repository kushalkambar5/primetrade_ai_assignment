import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-2xl font-bold">PrimeTradeAI</Link>
        <div className='flex gap-4'>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar