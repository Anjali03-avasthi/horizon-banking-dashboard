import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);  // Check if it's there
    if (!token) {
    alert('No token found. Please log in.');
    return;
    }
      const res = await axios.get('http://localhost:5000/api/transactions/history', {
         headers: { Authorization: `Bearer ${token}` },  // Add "Bearer"
     });
      setTransactions(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Transaction History</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.description} - ${t.amount} on {new Date(t.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;