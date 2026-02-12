import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <div className='flex flex-col items-center justify-center mt-10 h-[calc(100vh-4rem)]'>
        <h1 className='text-4xl font-bold'>A Good Trade for a Good Life</h1>
        <p className='text-lg mt-4'>Trade with the best AI-powered trading platform</p>
        <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 cursor-pointer">
          Get Started
        </Link>
        <div className='mt-4 text-gray-400 text-sm w-1/2 text-center text-red-500 border border-red-500 p-2 rounded'>I have made this full-stack website in Hurry in 5 hours due to my college quizes and exams.</div>
      </div>
      <Footer />
    </div>
  )
}

export default Home