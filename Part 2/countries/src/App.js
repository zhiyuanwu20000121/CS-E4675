import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '85187b1ffb12fff6e53a5ffa718999f3';

// Weather information display for a single country
const DisplaySingleCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  // const countryName = country.name;
  // const capital = country.capital;
  // const area = country.area;
  // const languages = country.languages;
  // const flag = country.flags;
  // const latlng = country.capitalInfo.latlng;
  const { capitalInfo: { latlng }, name, capital, area, languages, flags } = country;
  console.log(country)
  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: latlng[0],
            lon: latlng[1],
            units: 'metric',
            appid: API_KEY,
          },
        });
        setWeatherData({
          temp: data.main.temp,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (!weatherData) fetchWeatherData();
  }, [latlng, weatherData]);

  return (
    <div>
      <h2>{name.common}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt="flag" style={{ width: 175 }} />
      {weatherData && (
        <>
          <h2>Weather in {capital[0]}</h2>
          <p>temperature {weatherData.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather" />
          <p>wind {weatherData.wind} m/s</p>
        </>
      )}
    </div>
  );
};

// Component to toggle visibility of country details
const DisplayMultiCountries = ({ country }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      {country.name.common} 
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'hide' : 'show'}
      </button>
      {isVisible && <DisplaySingleCountry country={country} />}
    </div>
  );
};

// Main component to display countries based on search criteria
const DisplayCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <DisplayMultiCountries key={country.name.common} country={country} />
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    return <DisplaySingleCountry country={countries[0]} />;
  } else {
    return <div>No matches found</div>;
  }
};

// App component for searching and displaying countries
const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = search === '' ? countries : countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        Find countries <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <DisplayCountries countries={filteredCountries} />
    </div>
  );
};

export default App;
