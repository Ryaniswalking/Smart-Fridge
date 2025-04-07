import React, { useState } from "react";
import "../styles/newReminder.css";

const NewReminder = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const submittedTime = time || "23:59"

    const reminder = {
      title: title,
      createdBy: "System",
      reminderTime: [date, submittedTime].join(" "),
      description: description,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      status: "active",
      isRecurring: false,
      frequency: null,
      recurrenceEnd: null,
    };
    onSubmit(reminder);
  };

  return (
    <div className="new-reminder">
      <div className="new-reminder-outer">
        <div className="new-reminder-header">
          <h2>New Reminder</h2>
        </div>
        <form onSubmit={handleSubmit} className="new-reminder-inner">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter reminder title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter reminder details"
            rows="4"
          ></textarea>

          <div className="new-reminder-date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>

          <div className="new-reminder-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Reminder</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReminder;
