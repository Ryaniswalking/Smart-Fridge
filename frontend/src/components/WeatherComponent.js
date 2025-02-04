import React, { useState, useEffect } from 'react';
import CurrentWeather from "./CurrentWeather";
import '../styles/weatherComponent.css';

function WeatherComponent() {
  const [weather, setWeather] = useState(null);
  const city = process.env.REACT_APP_CITY || "Los Angeles"
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data.weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className="weather-container"> 
      <CurrentWeather weather={weather} />
    </div>
  );
}

export default WeatherComponent;
