import React, { useEffect, useState } from "react";
import WeatherComponent from "./WeatherComponent";
import WeeklyCalendar from "./WeeklyCalendar";
import RemindersList from "./ReminderList";
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="top-row">
                <div className="weather-container">
                    <WeatherComponent />
                </div>
                <div className="calendar-container">
                    <WeeklyCalendar />
                </div>
            </div>
            <div className="mid-row">
                <RemindersList />
            </div>
        </div>
    );
};

export default Dashboard;
