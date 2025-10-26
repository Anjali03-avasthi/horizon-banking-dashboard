import React, { useState } from 'react';
import axios from 'axios';

function Send() {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token:', token);  // Check if it's there
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }
    try {
      // Corrected: POST request to send money, with receiverEmail and amount in the body
      await axios.post('http://localhost:5000/api/transactions/send', { receiverEmail, amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Money sent successfully!');
      // Optional: Clear the form after success
      setReceiverEmail('');
      setAmount('');
    } catch (err) {
      console.error('Send error:', err.response.data);  // Log full error
      setMessage(err.response?.data?.message || 'Send failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Send Money</h2>
      <form onSubmit={handleSend}>
        <input 
          type="email" 
          placeholder="Receiver Email" 
          value={receiverEmail} 
          onChange={(e) => setReceiverEmail(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Send;
