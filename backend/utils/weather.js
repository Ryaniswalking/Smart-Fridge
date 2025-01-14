const axios = require('axios');

const getWeatherData = async (latitude, longitude) => {
    try{
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude,
                longitude, 
                current_weather: true,
                daily: 'temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`error fetching weather data: ${error.message}`)
    }
};

module.exports = { getWeatherData };
