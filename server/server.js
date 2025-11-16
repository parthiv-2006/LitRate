const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js'); // <-- IMPORT

// 1. Load env variables
dotenv.config();

// 2. Connect to database
connectDB();

const app = express();

// 4. Add Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A simple "hello world" route to make sure our server is working
app.get('/', (req, res) => {
  res.send('Hello from the BookStack server!');
});

// 5. Use User Routes
app.use('/api/users', userRoutes); // <-- USE

// 3. Use the PORT from .env, or 5000 as a default
const port = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});