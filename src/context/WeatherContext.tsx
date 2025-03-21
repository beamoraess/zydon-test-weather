"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { WeatherData, ForecastData } from "../app/types"

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  setWeather: (data: WeatherData) => void;
  setForecast: (data: ForecastData) => void
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
  
    return (
      <WeatherContext.Provider value={{ weather, forecast, setWeather, setForecast }}>
        {children}
      </WeatherContext.Provider>
    );
  }
  
  export function useWeather() {
    const context = useContext(WeatherContext);
    if (!context) {
      throw new Error("useWeather deve ser usado dentro de um WeatherProvider");
    }
    return context;
  }
