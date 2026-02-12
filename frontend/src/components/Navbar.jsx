import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Helper to display user name or email prefix
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
          PrimeTradeAI
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-4 items-center`}>
          {user ? (
            <>
              <span className="text-gray-300 mr-2">Hello, {displayName}</span>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors px-4 py-2">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
       {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
             {user ? (
            <>
              <span className="text-gray-300 px-2">Hello, {displayName}</span>
              <Link to="/dashboard" className="text-gray-300 hover:text-white px-2" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white px-2" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center" onClick={() => setIsMenuOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
       )}
    </nav>
  )
}

export default Navbar