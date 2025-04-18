import React from "react";
import "../styles/reminder.css";
import lateImgage from "../assets/reminder-icons/late.png";

function Reminder({ reminder, handleComplete }) {
  return (
    <div className="reminder">
      <div id="reminder-created-by">{reminder.createdBy}</div>
      {reminder.status == "passed" && (
        <img id="reminder-late-icon" src={lateImgage} />
      )}
      <div id="reminder-title">{reminder.title}</div>
      <div id="reminder-description">{reminder.description}</div>
      <div id="reminder-due-date">
        <em>{new Date(reminder.reminderTime).toLocaleString()}</em>
      </div>
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
