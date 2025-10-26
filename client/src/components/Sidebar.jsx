import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Banking Dashboard</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
        <li><Link to="/transactions" className="block p-2 hover:bg-gray-700 rounded">Transactions</Link></li>
        <li><Link to="/send" className="block p-2 hover:bg-gray-700 rounded">Send Money</Link></li>
        <li><Link to="/profile" className="block p-2 hover:bg-gray-700 rounded">Profile</Link></li>
        <li><button onClick={() => { localStorage.removeItem('token'); window.location = '/login'; }} className="block p-2 hover:bg-gray-700 rounded w-full text-left">Logout</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;