import React from "react";
import { WeatherData } from "@/app/types";

interface WeatherInformationsProps {
    weather: WeatherData;
  }

  function WeatherInformations({ weather }: WeatherInformationsProps) {
    return (
      <div className="text-center">
        {/* Ícone do clima */}
        <img
          className="w-32 mx-auto"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
        />
  
        {/* Temperatura */}
        <p className="text-6xl font-bold">{Math.round(weather.main.temp)}ºC</p>
  
        {/* Nome da cidade */}
        <p className="text-xl mt-2">{weather.name}</p>
  
        {/* Descrição do clima */}
        <p className="text-lg capitalize mt-2">
          {weather.weather[0].description}
        </p>
  
        {/* Informações adicionais */}
        <div className="p-4 flex justify-around mt-4">
          {/* Sensação térmica */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-temperature-high text-white-500 text-xl"></i>
            <p className="text-sm">{Math.round(weather.main.feels_like)}°C</p>
          </div>
  
          {/* Umidade */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-tint text-white-500 text-xl"></i>
            <p className="text-sm">{weather.main.humidity}%</p>
          </div>
  
          {/* Pressão atmosférica */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-tachometer-alt text-white-500 text-xl"></i>
            <p className="text-sm">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default WeatherInformations;