const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const reminderRoutes = require('./routes/reminderRoutes')
const digitalFrameRoutes = require('./routes/digitalFrameRoutes')

const app = express();
const PORT = 2080;

// Middleware
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes); // Add the weather routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/digital-frame', digitalFrameRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
