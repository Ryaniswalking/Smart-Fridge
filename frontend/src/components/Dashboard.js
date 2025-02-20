import React, { useEffect, useState } from "react";
import WeatherComponent from "./WeatherComponent";
import WeeklyCalendar from "./WeeklyCalendar";
import '../styles/dashboard.css';

const Dashboard = () => {
    

    return (
        <div className="dashboard">
            <div className="weather-container">
                <WeatherComponent />
            </div>
            <div className="calendar-container">
                <WeeklyCalendar />
            </div>
        </div>
    );
};

export default Dashboard;
