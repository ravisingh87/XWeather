import React, { useState } from "react";
import "./Weather.css";
import Card from "../components/Card";
const API_KEY = "3b4c822415044377939132318242808";

const Weather = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    temperature: "",
    humidity: "",
    condition: "",
    windSpeed: "",
  });

  let timer = null;

  const handleChange = (val) => {
    setSearchText(val);
  };

  const debounce = (fn, delay) => {
    if (timer) {
      clearTimeout(timer);
    }
    return (args) => {
      timer = setTimeout(() => {
        fn(args);
      }, delay);
    };
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchText}`
      );
      if (res.status !== 200) {
        // const error = await res.json();
        alert("Failed to fetch weather data");
        setIsLoading(false);
      }
      const jsonData = await res.json();
      setData({
        temperature: jsonData.current.temp_c,
        humidity: jsonData.current.humidity,
        condition: jsonData.current.condition.text,
        windSpeed: jsonData.current.wind_kph,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className='weather-cards'>
      <form onSubmit={handleFetch}>
        <input
          className='weather-search'
          type='search'
          autoComplete='off'
          required
          autoFocus
          name='search'
          onChange={debounce((e) => handleChange(e.target.value), 2000)}
        />
        <button className='submit-btn'>Search</button>
      </form>
      <div className='weather-card'>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          data.temperature !== "" && (
            <>
              <Card
                title={"Temperature"}
                data={data.temperature !== "" && data.temperature}
                type={data.temperature && "\u00b0C"}
              />
              <Card
                title={"Humidity"}
                data={data.humidity !== "" && data.humidity}
                type={data.humidity && "%"}
              />
              <Card
                title={"Condition"}
                data={data.condition !== "" && data.condition}
              />
              <Card
                title={"Wind Speed"}
                data={data.windSpeed !== "" && data.windSpeed}
                type={data.windSpeed && "kph"}
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Weather;
