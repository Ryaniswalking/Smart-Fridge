import React, { useState, useEffect } from "react";
import "../styles/weeklyCalendar.css";


const WeeklyCalendar = () => {
    const [events, setEvents] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/calendar/events`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const today = new Date();
    const todayIndex = today.getDay();
    const weekDates = [...Array(7)].map((_, index) => {
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() + index);
    });

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                {/* Add header content if needed */}
            </div>
            <div className="calendar-grid">
                {weekDates.map((date, index) => {
                    const dateKey = date.toISOString().split("T")[0];
                    const dayName = daysOfWeek[(todayIndex + index) % 7];
                    const dayNumber = date.getDate();
                    const dayEvents = events[dateKey]?.events || [];
    
                    return (
                        <div key={index} className="day">
                            <div className="day-header">
                                <span className="day-name">{dayName}</span>
                                <span className="day-number">{dayNumber}</span>
                            </div>
                            <div className="events">
                                {dayEvents.length > 0 ? (
                                    dayEvents.map((event, i) => (
                                        <div key={i} className={`event ${event.allDay ? 'all-day' : 'timed'}`}>
                                            <div className="event-title">{event.title}</div>
                                            {!event.allDay && (
                                                <div className="event-time">
                                                    {event.start}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-events">No events</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default WeeklyCalendar;
