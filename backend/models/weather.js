const { getWeatherDescription } = require('../utils/weatherDescription');

class Weather{
    constructor(city, currentTemp, weatherCode, high, low){
        this.city = city;
        this.currentTemp = currentTemp;
        this.weatherCode = weatherCode;
        this.high = high;
        this.low = low
    }
}

function parseWeatherData(city, rawData){
    if (!rawData || !rawData.current_weather || !rawData.daily) {
        throw new Error("Invalid weather data format");
    }

    const currentTemp = rawData.current_weather.temperature;
    const weatherCode= getWeatherDescription(rawData.current_weather.weathercode);
    const high = rawData.daily.temperature_2m_max[0];
    const low = rawData.daily.temperature_2m_min[0];

    return new Weather(city, currentTemp, weatherCode, high, low);
}

module.exports ={
    Weather,
    parseWeatherData,
}