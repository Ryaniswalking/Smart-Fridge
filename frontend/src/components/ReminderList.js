import React, { useEffect, useState } from "react";
import "../styles/reminderList.css";
import Reminder from "./Reminder";
import NewReminder from "./NewReminder";
import ReminderCount from "./ReminderCounts";

const RemindersList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapse, setCollapse] = useState(true);
  const [showNewReminder, setShowNewReminder] = useState(false);
  const [refreshCounts, setRefreshCounts] = useState(false);
  const fetchReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      if (!response.ok) {
        throw new Error("Failed to fetch reminders");
      }
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch reminders from the API
  useEffect(() => {
    fetchReminders();
  }, []);

  if (loading) {
    return <div>Loading reminders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleComplete = async (reminder) => {
    try {
      const completedReminder = {
        ...reminder,
        status: "completed",
        completedAt: new Date().toLocaleString(),
      };

      const response = await fetch("/api/reminders/update-reminder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completedReminder),
      });

      if (response.ok) {
        fetchReminders();
        setRefreshCounts((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newReminder = () => {
    setShowNewReminder(!showNewReminder);
  };

  const onClose = () => {
    setShowNewReminder(!showNewReminder);
  };

  const onSubmit = async (reminder) => {
    try {
      await fetch("/api/reminders/add-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder),
      });
      setShowNewReminder(false);
      fetchReminders();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="reminder-container">
      <div className={showNewReminder ? "overlay show" : "overlay"}></div>
      <h2>
        Reminders{" "}
        <span className="reminder-count">
          <span className="add-reminder" onClick={newReminder}>
            +
          </span>
          <ReminderCount refreshTrigger={refreshCounts}/>
        </span>
      </h2>
      {showNewReminder && <NewReminder onClose={onClose} onSubmit={onSubmit} />}
      <div className="tasks">
        <ul>
          {reminders
            .filter((reminder) => reminder.status !== "completed")
            .map((reminder) => (
              <li
                key={reminder.reminderId}
                className={reminder.status.toString()}
              >
                <Reminder reminder={reminder} handleComplete={handleComplete} />
              </li>
            ))}
        </ul>
      </div>
      <div className="completed-task-section">
        <h3
          className="completed-task-header"
          onClick={() => setCollapse(!collapse)}
        >
          Completed Tasks
        </h3>
        <div
          className={collapse ? "completed-tasks" : "completed-tasks active"}
        >
          <ul>
            {reminders
              .filter((reminder) => reminder.status === "completed")
              .reverse()
              .map((reminder) => (
                <li
                  key={reminder.reminderId}
                  className={reminder.status === "completed" ? "completed" : ""}
                >
                  <Reminder
                    reminder={reminder}
                    handleComplete={handleComplete}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RemindersList;
