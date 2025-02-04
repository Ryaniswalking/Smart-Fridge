import Reach from "react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = ({ weather }) => {
    if (!weather) return <p>Loading weather data...</p>;
    return (
        <div className="weather-info">
            <h3>{weather.city}</h3>
            <WeatherIcon condition={weather.weatherCode} />
            <p className="temp">{weather.currentTemp}°F</p>
            <p className="condition">{weather.weatherCode}</p>
            <p>High: {weather.high}°F | Low: {weather.low}°F</p>
        </div>
    );
};

export default CurrentWeather;