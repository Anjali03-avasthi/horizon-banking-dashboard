import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);  // Check if it's there
        if (!token) {
        alert('No token found. Please log in.');
        return;
        }
      const res = await axios.get('http://localhost:5000/api/transactions/balance', {
        headers: { Authorization:  `Bearer ${token}`},
      });
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p>Your Balance: ${balance}</p>
    </div>
  );
}

export default Dashboard;