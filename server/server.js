const express = require('express');
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")

dotenv.config()
connectDB()

const app = express();

// 3. Use the PORT from .env, or 5000 as a default
const port = process.env.PORT || 5000;

// A simple "hello world" route to make sure our server is working
app.get('/', (req, res) => {
  res.send('Hello from the BookStack server!');
});

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});