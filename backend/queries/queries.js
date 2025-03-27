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

const saveReminder = async (reminder) => {
  try {
    await pool.query(
      'CALL addreminder($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        reminder.createdBy,
        reminder.title,
        reminder.description,
        reminder.reminderTime,
        reminder.createdAt,
        reminder.updatedAt,
        reminder.status,
        reminder.isRecurring,
        reminder.frequency,
        reminder.recurrenceEnd
      ]
    );

    console.log("Save reminder: ", reminder)
  } catch (err) {
    console.error("ERROR: ", err.message);
    throw err;
  }
};

const updateReminder = async (reminder) => {
  try {
    const query = `
      UPDATE reminders
      SET status = $1, completed_at = $2
      where reminder_id = $3
      RETURNING *;
    `
    const values = [reminder.status, reminder.completedAt, reminder.reminderId]
    const result = await pool.query(query, values);

    if(result.rowCount === 0){
      throw new Error('Reminder Not Found');
    }

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err
  }
}

module.exports = { getReminders, saveReminder, updateReminder };
