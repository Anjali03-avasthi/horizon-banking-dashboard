import React from 'react';

function Navbar() {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Welcome to Horizon Bank</h1>
      <span>User: {localStorage.getItem('token') ? 'Logged In' : 'Guest'}</span>  // Placeholder; you can fetch user data later
    </header>
  );
}

export default Navbar;