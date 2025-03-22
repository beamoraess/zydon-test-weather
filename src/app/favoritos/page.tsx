"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { ForecastData, WeatherData } from "../types";
import WeatherInformations from "@/components/WeatherInformations/WeatherInformations";
import { Button } from "@/components/ui/button";
import { getBackgroundImageForWeather } from "@/utils/backgroundImage";
import { useFavoriteCities } from "@/context/FavoriteCitiesContext";
import { useWeather } from "@/context/WeatherContext";


export default function Favoritos() {
  const { favoriteCities } = useFavoriteCities();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setWeather, setForecast } = useWeather();
  const router = useRouter();
  const key = "f75ea9e44c5fdd381d788becc0895561";

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        favoriteCities.map((city) =>
          axios
            .get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`)
            .then((response) => response.data)
            .catch((error) => {
              console.error("Erro ao buscar o clima:", error);
              return null;
            })
        )
      );
      setWeatherData(data.filter((item) => item !== null) as WeatherData[]);
    };
  
    fetchWeatherData();
  }, [favoriteCities]);

  const handleViewDetails = async (cityName: string) => {
    setIsLoading(true);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&lang=pt_br&units=metric`
        ),
        axios.get<ForecastData>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&lang=pt_br&units=metric`
        ),
      ]);

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      
      router.push(`/cidade/${cityName}`);
    } catch (error) {
      console.error("Erro ao buscar o clima:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('${getBackgroundImageForWeather(
          weatherData[0]?.weather[0].main || "default"
        )}')`,
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <div className="bg-black/50 text-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-2">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Cidades Favoritas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {weatherData.map((weather, index) => (
            <div
              key={index}
              className="bg-white/10 p-3 md:p-4 rounded-lg shadow-md text-center flex flex-col items-center w-full"
            >
              <WeatherInformations weather={weather} />
              <Button
                onClick={() => handleViewDetails(weather.name)}
                variant="outline"
                className="w-full mt-2 text-black"
              >
                Ver Detalhes
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

