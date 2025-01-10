const express = require('express');
const app = express();
const PORT = 2080;

// Middleware
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
