class Weather{
    constructor(currentTemp, weatherCode, high, low){
        this.currentTemp = currentTemp;
        this.weatherCode = weatherCode;
        this.high = high;
        this.low = low
    }
}

function parseWeatherData(rawData){
    if (!rawData || !rawData.current_weather || !rawData.daily) {
        throw new Error("Invalid weather data format");
    }

    const currentTemp = rawData.current_weather.temperature;
    const weatherCode= rawData.current_weather.weathercode;
    const high = rawData.daily.temperature_2m_max[0];
    const low = rawData.daily.temperature_2m_min[0];

    return new Weather(currentTemp, weatherCode, high, low);
}

module.exports ={
    Weather,
    parseWeatherData,
}