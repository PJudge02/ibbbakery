const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the IBB Bakery API!');
  });

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});