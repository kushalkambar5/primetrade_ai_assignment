import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getTasks, getStats } from '../services/taskService';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ balance: 0, profit: 0, activeTrades: 0, totalTrades: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, statsData] = await Promise.all([getTasks(), getStats()]);
        setTasks(tasksData);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      
      <div className="grow container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
            Welcome back, {user?.name || user?.email || 'Trader'}!
          </h1>
          <p className="text-gray-400 mt-2">Here's what's happening with your portfolio today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-blue-500 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Total Balance</h3>
            <p className="text-2xl font-bold mt-2">${stats.balance.toLocaleString()}</p>
            <span className="text-green-400 text-sm flex items-center mt-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              +2.5%
            </span>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-blue-500 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Total Profit</h3>
            <p className={`text-2xl font-bold mt-2 ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.profit >= 0 ? '+' : ''}${stats.profit.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-blue-500 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Active Trades</h3>
            <p className="text-2xl font-bold mt-2">{stats.activeTrades}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-blue-500 transition-colors">
             <h3 className="text-gray-400 text-sm font-medium uppercase">Total Trades</h3>
             <p className="text-2xl font-bold mt-2">{stats.totalTrades}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Table */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-700/50 text-gray-400 text-xs uppercase">
                    <th className="px-6 py-4">Symbol</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-400">Loading activity...</td></tr>
                  ) : Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{task.symbol}</td>
                        <td className={`px-6 py-4 ${task.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                          {task.type}
                        </td>
                        <td className="px-6 py-4 text-gray-400">{task.date}</td>
                        <td className="px-6 py-4">${task.price}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            task.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center py-8 text-gray-400">No recent activity</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New Trade
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Deposit Funds
              </button>
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Market Overview</h3>
                <div className="space-y-3">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">S&P 500</span>
                      <span className="text-green-400">+1.24%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">NASDAQ</span>
                      <span className="text-green-400">+1.45%</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">BTC/USD</span>
                      <span className="text-red-400">-0.85%</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Dashboard