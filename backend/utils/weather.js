const axios = require('axios');

const getWeatherData = async (latitude, longitude) => {
    try{
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude,
                current_weather: true,
                daily: 'temperature_2m_max,temperature_2m_min,windspeed_10m_max',
                hourly: 'precipitation,precipitation_probability,cloud_cover',
                temperature_unit: 'fahrenheit',
                windspeed_unit: 'mph',
                precipitation_unit: 'inch', // Convert precipitation to inches
                timezone: 'auto',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`error fetching weather data: ${error.message}`)
    }
};

const getCurrentWeather = async (latitude, longitude) => {
    try{
        const response = await axios.get('https://api.open-meteo.com/v1/forecast',{
            params: {
                latitude,
                longitude,
                current_weather:true
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching current weather: ${error.message}`)
    }
}

module.exports = { getWeatherData, getCurrentWeather };
