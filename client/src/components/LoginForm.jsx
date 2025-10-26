import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location = '/dashboard';  // Redirect
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2" required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2" required />
      <button type="submit" className="bg-blue-500 p-2 text-white">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default LoginForm;