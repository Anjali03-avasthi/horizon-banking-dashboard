const express = require('express');  // Require Express first
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // If you added this for CORS


// Load environment variables
dotenv.config();

const app = express();  // Initialize app here

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(cors({ origin: 'http://localhost:5173' }));  // Allow CORS for your frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import and use routes after app is initialized
const authRoutes = require('./routes/auth');  // Assuming this file exists
app.use('/api/auth', authRoutes);

//Transaction routes
const transactionRoutes = require('./routes/transaction');
app.use('/api/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});