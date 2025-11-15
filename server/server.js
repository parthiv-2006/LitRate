const express = require('express');
const app = express();
const port = 5000; // We'll move this to a .env file later

// A simple "hello world" route to make sure our server is working
app.get('/', (req, res) => {
  res.send('Hello from the BookStack server!');
});

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});