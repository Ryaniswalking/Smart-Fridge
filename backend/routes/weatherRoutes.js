const express = require('express');

const { getCoordinates } = require('../utils/geocoding');
const { getWeatherData } = require('../utils/weather');

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

        res.status(200).json({
            success: true,
            input,
            coordinates: {lat, lon},
            weather: weatherData,
        });
    } catch (error){
        console.error(error.message);
        res.status(500).json({
            success: false, 
            message: error.message || 'An error occurred while fetching weather data.'
        })
    }
})

module.exports = router;
