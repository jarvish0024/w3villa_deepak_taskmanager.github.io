const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow only this origin
    methods: 'GET,POST,PUT,PATCH,DELETE',  // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Allow specific headers
  };

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
