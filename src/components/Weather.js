import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const defaultLocation = { lat: 40.7128, lon: -74.0060 }; 

  const fetchWeather = async (lat, lon) => {
    const apiKey = 'b4c51322e42d3139ecc16e522fa5cc2a'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data); 
        setError(null);   
      } else {
        setError('Enable location to show weather data.');
        setWeather(null); 
      }
    } catch (err) {
      setError('Enable location to show weather data.');
      setWeather(null); 
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude); 
        },
        () => {
          fetchWeather(defaultLocation.lat, defaultLocation.lon); 
        }
      );
    } else {
      fetchWeather(defaultLocation.lat, defaultLocation.lon); 
    }
  }, []);

  return (
    <div className="weather-container">
      {error && !weather && <p>{error}</p>} {/* Show error only if there's no weather data */}
      {weather && !error && (  
        <p>
          {weather.name}: {Math.round(weather.main.temp)}°C, {weather.weather[0].description}
        </p>
      )}
    </div>
  );
};

export default Weather;
