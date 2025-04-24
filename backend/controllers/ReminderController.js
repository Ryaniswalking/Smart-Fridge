const {
  getReminders,
  saveReminder,
  updateReminder,
  getWeeklyCountsQuery,
  getTotalCountQuery,
  getTodayCountQuery
} = require("../queries/queries");
const { parseReminder } = require("../models/reminder");

const isPastDue = (reminderData) => {
  if (!reminderData) return false;

  const dueDate = new Date(reminderData.reminderTime);
  const now = new Date();

  return now > dueDate;
};

function checkRemindersPassedDue(reminders) {
  reminders.forEach((reminder) => {
    if (reminder.status === "active" && isPastDue(reminder)) {
      reminder.status = "passed";
    }
  });
  return reminders;
}

async function getAllReminders() {
  try {
    const results = await getReminders();
    const parsed = parseReminder(results);
    const reminders = checkRemindersPassedDue(parsed);

    return reminders;
  } catch (err) {
    throw err("Failed to get reminders");
  }
}

async function getWeeklyCount() {
  try {
    const countObj = await getWeeklyCountsQuery();
    return countObj.count;
  } catch (err) {
    console.log(err);
  }
}

async function getTotalCount() {
  try {
    const countObj = await getTotalCountQuery();
    return countObj.count;
  } catch (err) {
    console.log(err);
  }
}

async function getTodayCount() {
  try {
    const countObj = await getTodayCountQuery();
    return countObj.count;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllReminders,
  getWeeklyCount,
  getTotalCount,
  getTodayCount,
};
