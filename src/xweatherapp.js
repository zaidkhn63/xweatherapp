import React, { useState } from 'react';
import "./weather.css";

const WeatherApp = () => {
  // State variables to hold user input and weather data
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
console.log(city)
  // Function to handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to fetch weather data for the input city
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d0bec8948537487fb46192546240706&q=${city}`);
      console.log(response)
      const data = await response.json();
      if (data.error) {
        alert('Failed to fetch weather data');
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search button click
  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    } else {
      alert('Please enter a city name');
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
