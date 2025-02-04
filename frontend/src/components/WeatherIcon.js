import React from "react";

const images = require.context("../assets/weather-icons", false, /\.(png|jpe?g|svg)$/)

const weatherIcons = images.keys().reduce((icons, path) => {
    const key = path.replace("./","").replace(/\.[^/.]+$/, "");
    icons[key] = images(path);
    return icons;
}, {});

const WeatherIcon = ({ condition }) => {
    const icon = weatherIcons[condition];
    return <img src={icon} alt={condition} className="weather-icon"/>
}

export default WeatherIcon;