const pool = require('../config/db'); // Import the database pool

// Function to fetch all reminders
const getReminders = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM reminders order by reminder_time asc'
      );
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

const getWeeklyCountsQuery = async () => {
  try{ 
    const query = `
      select count(*) from reminders
      where completed_at BETWEEN NOW() - INTERVAL '7 days' and NOW(); 
    `
    const result = await pool.query(query)
    return result.rows[0];
  } catch (err) {
    throw err;
  };
}

const getTotalCountQuery = async () => {
  try{
    const query = `
      select count(*) from reminders
      where completed_at is NOT NULL
    `
    const result = await pool.query(query)
    return result.rows[0];
  } catch (err){
    throw err;
  }
}

const getTodayCountQuery = async () => {
  try{
    const query = `
    SELECT COUNT(*) FROM reminders
    WHERE completed_at >= CURRENT_DATE
    AND completed_at < CURRENT_DATE + INTERVAL '1 day';
    `
    const result = await pool.query(query);
    return result.rows[0]
  } catch (err) {
    throw new Error(`Could not query db for today's counts: ${err}`)
  }
};

module.exports = { 
  getReminders, 
  saveReminder, 
  updateReminder,
  getWeeklyCountsQuery, 
  getTotalCountQuery,
  getTodayCountQuery
} 
