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
                <em>{new Date(reminder.reminder_time).toLocaleString()}</em>
            </div>
            <div>Status: {reminder.status}</div>
            {reminder.is_recurring && (
                <div>
                    Recurring: {reminder.frequency} until{' '}
                    {new Date(reminder.recurrence_end).toLocaleDateString()}
                </div>
            )}
            {reminder.status !== 'completed' && (
                <button
                    onClick={() => handleComplete(reminder.reminder_id)}
                    className="complete-button"
                >
                    Complete
                </button>
            )}
        </div>
    );
}

export default Reminder;