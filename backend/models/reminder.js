class Reminder {
  constructor(
    reminderId,
    createdBy,
    title,
    description,
    reminderTime,
    createdAt,
    updatedAt,
    status,
    isRecurring,
    frequency,
    recurrenceEnd
  ) {
    this.reminderId = reminderId;
    this.createdBy = createdBy;
    this.title = title;
    this.description = description;
    this.reminderTime = reminderTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.isRecurring = isRecurring;
    this.frequency = frequency;
    this.recurrenceEnd = recurrenceEnd;
  }
}

const isPastDue = (reminderTime) => {
  console.log("reminder time:", reminderTime);
  if (!reminderTime) return false;

  console.log(reminderTime);
  const dueDate = new Date(reminderTime);
  const now = new Date();

  return now > dueDate;
};

function parseReminder(rawData) {
  // Check if rawData is an array
  if (Array.isArray(rawData)) {
    return rawData.map((data) => {
      const status = isPastDue(data.reminder_time) ? "passed" : data.status;
      return new Reminder(
        data.reminder_id,
        data.created_by,
        data.title,
        data.description,
        data.reminder_time,
        data.created_at,
        data.updated_at,
        status,
        data.is_recurring,
        data.frequency,
        data.recurrence_end
      );
    });
  } else {
    // For single object, compute status once
    const status = isPastDue(rawData.reminder_time) ? "passed" : rawData.status;
    return new Reminder(
      rawData.reminder_id,
      rawData.created_by,
      rawData.title,
      rawData.description,
      rawData.reminder_time,
      rawData.created_at,
      rawData.updated_at,
      status,
      rawData.is_recurring,
      rawData.frequency,
      rawData.recurrence_end
    );
  }
}

module.exports = {
  Reminder,
  parseReminder,
};
