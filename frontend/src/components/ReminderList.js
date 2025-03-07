import React, { useEffect, useState } from 'react';
import '../styles/reminders.css';
import Reminder from './Reminder';

const RemindersList = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapse, setCollapseComplete] = useState(true);
    const [completedTaskCss, setCompletedTaskCss] = useState("completed-task")

    // Fetch reminders from the API
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await fetch('/api/reminders');
                if (!response.ok) {
                    throw new Error('Failed to fetch reminders');
                }
                const data = await response.json();
                console.log(data)
                setReminders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, []);

    if (loading) {
        return <div>Loading reminders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleComplete = (reminderId) => {
        setReminders(prevReminders =>
            prevReminders.map(reminder =>
                reminder.reminder_id === reminderId
                    ? { ...reminder, status: 'completed' }
                    : reminder
            )
        );
    };

    const collapseComplete = (active) =>{
        setCompletedTaskCss(active ? "completed-tasks" : "active");
        setCollapseComplete(!active)
    }
    return (
        <div>
            <h2>Reminders</h2>
            <ul>
                {reminders
                    .filter(reminder => reminder.status !== 'completed')
                    .map(reminder => (
                        <li
                            key={reminder.reminder_id}
                            className={reminder.status === 'completed' ? 'completed' : ''}
                        >
                            <Reminder
                                reminder={reminder}
                                handleComplete={handleComplete}
                            />
                        </li>
                    ))}
            </ul>
            <h3 className="test" onClick={() => collapseComplete(collapse)}>Completed Tasks</h3>
            <div className={completedTaskCss} >
                <ul>
                    {reminders
                        .filter(reminder => reminder.status === 'completed')
                        .map(reminder => (
                            <li
                                key={reminder.reminder_id}
                                className={reminder.status === 'completed' ? 'completed' : ''}
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
    );
};

export default RemindersList;