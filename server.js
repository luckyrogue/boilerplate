const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

const connectDB = require('./config/db');

// Connect DB
connectDB();

// App Middlewares
app.use(express.json());
app.use(morgan('dev'));
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// Routes
const authRoutes = require('./routes/auth');

// Middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
