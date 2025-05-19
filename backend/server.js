const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/* "start": "concurrently \"npm run server\" \"npm run client\"",*/


// Route for the root URL
app.get('/', (req, res) => {
  res.json('Welcome to the IBB Bakery API!');
  });

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});