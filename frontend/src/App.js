import React, { useEffect, useState } from 'react';
import WeatherDashboard from './components/dashboard'; // Adjust the path based on your structure

function App() {
  const [description, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.description);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>React + Express Template</h1>
      <p>Message from the backend: {description}</p>
      {/* Render the WeatherDashboard */}
      <WeatherDashboard />
    </div>
  );
}

export default App;
