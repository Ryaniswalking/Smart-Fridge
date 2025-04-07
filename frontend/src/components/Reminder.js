import React from "react";
import "../styles/reminders.css";

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
      <div>Created By: {reminder.createdBy}</div>
      {reminder.isRecurring && (
        <div>
          Recurring: {reminder.frequency} until{" "}
          {new Date(reminder.recurrenceEnd).toLocaleDateString()}
        </div>
      )}
      {reminder.status !== "completed" && (
        <button
          onClick={() => handleComplete(reminder)}
          className="complete-button"
        >
          Complete
        </button>
      )}
    </div>
  );
}

export default Reminder;
