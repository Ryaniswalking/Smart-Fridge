import React from "react";
import WeatherComponent from "./WeatherComponent";
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <WeatherComponent />
        </div>
    )
}

export default Dashboard;