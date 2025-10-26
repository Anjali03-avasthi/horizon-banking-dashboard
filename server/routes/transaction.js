const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Middleware to verify token and get user
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Remove "Bearer" if present
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // This must be inside the try block
    next();
  } catch (err) {
    console.error('Token verification error:', err);  // Add logging for debugging
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get user balance
router.get('/balance', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.balance });
  } catch (err) {
    console.error('Balance fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send money
router.post('/send', verifyToken, async (req, res) => {
  const { receiverEmail, amount } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) return res.status(400).json({ message: 'Receiver not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // Create transaction record
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      description: `Sent to ${receiver.username}`,
    });
    await transaction.save();

    res.json({ message: 'Money sent successfully' });
  } catch (err) {
    console.error('Send money error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate('sender receiver', 'username email');
    res.json(transactions);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;