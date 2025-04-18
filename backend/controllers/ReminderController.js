const { getReminders, saveReminder, updateReminder} = require('../queries/queries')
const { parseReminder } = require('../models/reminder');

const isPastDue = (reminderData) => {
  if (!reminderData) 
    return false;

  const dueDate = new Date(reminderData.reminderTime);
  const now = new Date();

  return now > dueDate;
};

function checkRemindersPassedDue(reminders){
    reminders.forEach((reminder) => {
        if (reminder.status === "active" && isPastDue(reminder)) {
            reminder.status = "passed";
        }
    });
    return reminders;
}

async function getAllReminders(){
  try{
    const results = await getReminders();
    const parsed = parseReminder(results);
    const reminders = checkRemindersPassedDue(parsed);
    
    return reminders;
  } catch (err){
    throw err ("Failed to get reminders");
  }
}

module.exports = { getAllReminders }