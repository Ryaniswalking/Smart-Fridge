class Reminder {
    constructor(reminderId, createdBy, title, description, reminderTime, createdAt,
        updatedAt, status, isRecurring, frequency, recurrenceEnd) {
        this.reminderId = reminderId
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

function parseReminder(rawData) {
    if (Array.isArray(rawData)) {
        return rawData.map(rawData => new Reminder(
            rawData.reminder_id,
            rawData.created_by,
            rawData.title,
            rawData.description,
            rawData.reminder_time,
            rawData.created_at,
            rawData.updated_at,
            rawData.status,
            rawData.is_recurring,
            rawData.frequency,
            rawData.recurrence_end
        ));
    }
    return new Reminder(
        rawData.reminder_id,
        rawData.created_by,
        rawData.title,
        rawData.description,
        rawData.reminder_time,
        rawData.created_at,
        rawData.updated_at,
        rawData.status,
        rawData.is_recurring,
        rawData.frequency,
        rawData.recurrence_end
    );
}

module.exports = {
    Reminder,
    parseReminder
};