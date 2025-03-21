import React from 'react';
import '../styles/reminders.css';

function Reminder({ reminder, handleComplete }) {
    return (
        <div>
            <div>
                <strong>{reminder.title}</strong>
            </div>
            <div>{reminder.description}</div>
            <div>
                <em>{new Date(reminder.reminderTime).toLocaleString()}</em>
            </div>
            <div>Status: {reminder.status}</div>
            <div>CreateBy: {reminder.createdBy}</div>
            {reminder.isRecurring && (
                <div>
                    Recurring: {reminder.frequency} until{' '}
                    {new Date(reminder.recurrenceEnd).toLocaleDateString()}
                </div>
            )}
            {reminder.status !== 'completed' && (
                <button
                    onClick={() => handleComplete(reminder.reminderId)}
                    className="complete-button"
                >
                    Complete
                </button>
            )}
        </div>
    );
}

export default Reminder;