import React, { useState, useEffect } from "react";

const apiKey = "b3c2b951c74116383a59e56d53f0e644";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("delhi");
  const [cityName, setCityName] = useState("delhi");

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const data = await response.json();

      const filteredData = data.list.filter(
        (forecast, index) => index % 7 === 0
      );

      setWeatherData(filteredData);
      console.log(data.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city !== "") {
      fetchWeatherData(city);
      setCity("");
      setCityName(city);
    }
  };

  const getWeatherIconName = (weatherCondition) => {
    const iconMap = {
      Clear: "wb_sunny",
      Clouds: "wb_cloudy",
      Rain: "umbrella",
      Thunderstorm: "flash_on",
      Drizzle: "grain",
      Snow: "ac_unit",
      Mist: "cloud",
      Smoke: "cloud",
      Haze: "cloud",
      Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
  };

  return (
    <div className="weather-app">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
        />
        <button className="search-btn" type="submit">
          <i className="material-icons">search</i>
        </button>
      </form>
      <h2 className="city-name">Showing weather for {cityName}</h2>
      <div className="forecast-container">
        {weatherData &&
          weatherData.map((forecastEntry, index) => (
            <div key={index} className="forecast-entry">
              <p className="forecast-date">
                {new Date(forecastEntry.dt * 1000).toDateString()}
              </p>
              <div className="temperature-info">
                <div className="description">
                  <i className="material-icons">
                    {getWeatherIconName(forecastEntry.weather[0].main)}
                  </i>
                  <span className="description-text">
                    {forecastEntry.weather[0].description}
                  </span>
                </div>
                <div className="temp">
                  {Math.round(forecastEntry.main.temp)}°
                </div>
              </div>
              <div className="additional-info">
                <div className="wind-info">
                  <i className="material-icons">air</i>
                  <div>
                    <h3 className="wind-speed">
                      {forecastEntry.wind.speed} KM/H
                    </h3>
                    <p className="wind-label">Wind</p>
                  </div>
                </div>
                <div className="humidity-info">
                  <i className="material-icons">water_drop</i>
                  <div>
                    <h3 className="humidity">{forecastEntry.main.humidity}%</h3>
                    <p className="humidity-label">humidity</p>
                  </div>
                </div>
                <div className="visibility-info">
                  <i className="material-icons">visibility</i>
                  <div>
                    <h3 className="visibility-distance">
                      {forecastEntry.visibility / 1000} KM/H
                    </h3>
                    <p className="visibility">Visibility</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Weather;
