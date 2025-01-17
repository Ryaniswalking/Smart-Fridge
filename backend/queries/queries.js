const pool = require('../config/db'); // Import the database pool

// Function to fetch all reminders
const getReminders = async () => {
  try {
    const result = await pool.query('SELECT * FROM reminders');
    return result.rows; // Return rows from the result
  } catch (err) {
    console.error('Error fetching reminders:', err.message);
    throw err; // Re-throw the error to be handled by the caller
  }
};

module.exports = { getReminders };
