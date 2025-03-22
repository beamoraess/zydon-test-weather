import React from "react";
import { WeatherData } from "@/app/types";

interface WeatherInformationsProps {
  weather: WeatherData;
}

function WeatherInformations({ weather }: WeatherInformationsProps) {
  return (
    <div className="text-center">
      <img
        className="w-32 mx-auto"
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p className="text-6xl font-bold">{Math.round(weather.main.temp)}ºC</p>
      <p className="text-xl mt-2">{weather.name}</p>
      <p className="text-lg capitalize mt-2">
        {weather.weather[0].description}
      </p>
      <div className="p-4 flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <i className="fas fa-temperature-high text-white text-lg"></i>
          <p className="text-sm">{Math.round(weather.main.feels_like)}°C</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-tint text-white text-lg"></i>
          <p className="text-sm">{weather.main.humidity}%</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fas fa-tachometer-alt text-white text-lg"></i>
          <p className="text-sm">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInformations;
