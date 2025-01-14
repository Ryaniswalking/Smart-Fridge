const axios = require('axios');

//get coordinates with Nominatim
const getCoordinates = async (input) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: input,
            format: 'json',
          },
          headers: {
            'User-Agent': 'YourAppName', // Nominatim requires a User-Agent header
          },
        });
    
        if (!response.data || response.data.length === 0) {
          throw new Error(`Could not find coordinates for city: ${city}`);
        }
    
        const location = response.data[0];
        return { lat: location.lat, lon: location.lon };
      } catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
      }
};

module.exports = {getCoordinates};