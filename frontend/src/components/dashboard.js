import React, { useState } from 'react';

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [input, setCity] = useState('');

  const fetchWeatherData = async () => {
    if (!input.trim()) {
      console.error('City name cannot be empty.');
      return;
    }
    try {
      const response = await fetch(`/api/weather?input=${encodeURIComponent(input)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data.weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h2>Weather Dashboard</h2>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter city" 
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weather && (
        <div>
          <p>Current Temp: {weather.currentTemp}°F</p>
          <p>Weather: {weather.weatherCode}</p>
          <p>High: {weather.high}°F</p>
          <p>Low: {weather.low}°F</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
