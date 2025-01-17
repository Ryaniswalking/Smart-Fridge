const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const { getReminders } = require('./queries/queries'); /// Import the connection pool

const app = express();
const PORT = 2080;

// Middleware
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes); // Add the weather routes
app.get('/api', async (req, res) => {
  try {
    const result = await getReminders(); // Wait for the promise to resolve      // Logging the result
    res.json(result[0]);                // Send the rows as a JSON response
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).send('Error fetching reminders');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
