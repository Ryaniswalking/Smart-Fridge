import React, { useEffect, useState } from 'react';
import '../styles/reminders.css';
import Reminder from './Reminder';
import NewReminder from './NewReminder';

const RemindersList = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [collapse, setCollapse] = useState(true);
    const [showNewReminder, setShowNewReminder] = useState(false);

    // Fetch reminders from the API
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await fetch('/api/reminders');
                if (!response.ok) {
                    throw new Error('Failed to fetch reminders');
                }
                const data = await response.json();
                setReminders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, [showNewReminder]);

    if (loading) {
        return <div>Loading reminders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleComplete = async (reminder) => {
        try{
            const completedReminder = {
                ...reminder,
                status: 'completed', 
                completedAt: new Date().toISOString()
            }
    
            const response = await fetch('/api/reminders/update-reminder', {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completedReminder)
            })
    
            console.log("Response", response);
            if(response.ok){
                setReminders(prevReminders =>
                    prevReminders.map(rem =>
                        rem.reminderId === reminder.reminderId
                            ? { ...rem, status: 'completed' }
                            : rem
                    )
                );
            }else{
                console.log("NAS QUEEN");
            }
        } catch (err) {
            console.log(err)
        }


    };

    const newReminder = () => {
        setShowNewReminder(!showNewReminder)
    }

    const onClose = () =>{
        setShowNewReminder(!showNewReminder)
    }

    const onSubmit = async (reminder) => {
        try{
            const response = await fetch('/api/reminders/add-reminder', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reminder),
            });
            console.log(response.ok);
            setShowNewReminder(false)
        } catch (err) {
            console.error(err.message);
        }

    }

    return (
        <div>
            <div>
                <h2>Reminders <span className='add-reminder' onClick={newReminder}>+</span></h2>
            </div>
            {showNewReminder && (
                <NewReminder 
                    onClose = {onClose}
                    onSubmit = {onSubmit}
                />
            )}
            <div className="tasks">
                <ul>
                    {reminders
                        .filter(reminder => reminder.status !== 'completed')
                        .map(reminder => (
                            <li
                                key={reminder.reminderId}
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
            <h3 className="test" onClick={() => setCollapse(!collapse)}>Completed Tasks</h3>
            <div className={collapse ? "completed-tasks" : "completed-tasks active"} >
                <ul>
                    {reminders
                        .filter(reminder => reminder.status === 'completed')
                        .map(reminder => (
                            <li
                                key={reminder.reminderId}
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