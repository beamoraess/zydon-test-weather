"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { WeatherData } from "../types";
import WeatherInformations from "@/components/WeatherInformations/WeatherInformations";
import { useRouter } from "next/navigation";
import { getBackgroundImageForWeather } from "@/utils/backgroundImage";
import { ArrowLeftIcon } from "lucide-react";
import { useFavoriteCities } from "@/context/FavoriteCitiesContext";

export default function Favoritos() {
    const { favoriteCities } = useFavoriteCities();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const key = "f75ea9e44c5fdd381d788becc0895561";
    const fetchWeatherData = async () => {
      const data = await Promise.all(
        favoriteCities.map((city) =>
          axios
            .get<WeatherData>(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
            )
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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('${getBackgroundImageForWeather(
          weatherData[0]?.weather[0].main || "default"
        )}')`,
      }}
    >
      <button
        onClick={() => router.push("/")} // Redireciona para a página inicial
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <div className="bg-black/50 text-white p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-4">
        <h1 className="text-2xl font-bold mb-6">Cidades Favoritas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {weatherData.map((weather, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-lg shadow-md text-center"
            >
              <WeatherInformations weather={weather} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
