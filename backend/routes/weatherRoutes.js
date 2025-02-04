const express = require('express');

const { getCoordinates } = require('../utils/geocoding');
const { getWeatherData, getCurrentWeather } = require('../utils/weather');
const { parseWeatherData } = require('../models/weather')

const router = express.Router();

//Route to get weather by city
router.get('/', async (req, res) => {
    const { city } = req.query;

    if(!city){
        return res.status(400).json({
            success: false,
            message: 'Please provide and city.'
        });
    }

    try{
        const { lat, lon } = await getCoordinates(city);     
        const weatherData = await getWeatherData(lat, lon);
        const weather = parseWeatherData(city, weatherData);

        res.status(200).json({
            success: true,
            city,
            coordinates: {lat, lon},
            weather: weather,
            // rawData: weatherData,
        });
    } catch (error){
        res.status(500).json({
            success: false, 
            message: error.message || 'An error occurred while fetching weather data.'
        })
    }
})

module.exports = router;
