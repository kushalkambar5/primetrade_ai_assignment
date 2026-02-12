import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { signup } from '../services/userService.js'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await signup(data.name, data.email, data.password)
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Create Account</h2>
          <p className="text-gray-400 text-center mb-8">Join PrimeTradeAI today</p>
          
          <form className='flex flex-col gap-6'>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input 
                id="name"
                type="text" 
                placeholder="John Doe" 
                className='w-full bg-gray-700 border border-gray-600 text-white p-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200' 
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                className='w-full bg-gray-700 border border-gray-600 text-white p-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200' 
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className='w-full bg-gray-700 border border-gray-600 text-white p-3 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200' 
              />
            </div>

            <button 
              type="submit" 
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-200 transform hover:scale-[1.02]'
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold selection:bg-blue-500 selection:text-white">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup