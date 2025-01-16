const express = require('express');

const { getCoordinates } = require('../utils/geocoding');
const { getWeatherData, getCurrentWeather } = require('../utils/weather');
const { parseWeatherData } = require('../models/currentWeather')

const router = express.Router();

//Route to get weather by input
router.get('/', async (req, res) => {
    const { input } = req.query;

    if(!input){
        return res.status(400).json({
            success: false,
            message: 'Please provide and input.'
        });
    }

    try{
        const { lat, lon } = await getCoordinates(input);
        
        const weatherData = await getWeatherData(lat, lon);

        const weather = parseWeatherData(weatherData);

        res.status(200).json({
            success: true,
            input,
            coordinates: {lat, lon},
            weather: weather,
            rawData: weatherData,
        });
    } catch (error){
        res.status(500).json({
            success: false, 
            message: error.message || 'An error occurred while fetching weather data.'
        })
    }
})

module.exports = router;
