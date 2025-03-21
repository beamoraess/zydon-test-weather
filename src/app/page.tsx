"use client";

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { WeatherData, ForecastData } from "./types";
import { getBackgroundImageForWeather } from "@/utils/backgroundImage";
import { useWeather } from "@/context/WeatherContext";
import { useRouter } from "next/navigation";
import { useFavoriteCities } from "@/context/FavoriteCitiesContext";
import WeatherInformationsSkeleton from "@/components/WeatherInformationsSkeleton/WeatherInformationsSkeleton";

const LazyWeatherInformations = lazy(
  () => import("@/components/WeatherInformations/WeatherInformations")
);

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { weather, setWeather, setForecast } = useWeather();
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { favoriteCities, toggleFavorite } = useFavoriteCities();

  useEffect(() => {
    fetchWeather("Uberlândia");
  }, []);

  const fetchWeather = useCallback(
    async (city: string) => {
      const key = "f75ea9e44c5fdd381d788becc0895561";
      setIsLoading(true);

      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
          ),
          axios.get<ForecastData>(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`
          ),
        ]);

        setWeather(weatherResponse.data);
        setForecast(forecastResponse.data);

        const weatherCondition = weatherResponse.data.weather[0].main;
        setBackgroundImage(getBackgroundImageForWeather(weatherCondition));
      } catch (error) {
        console.error("Erro ao buscar o clima:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setWeather, setForecast]
  );
  
  const searchCity = useCallback(async () => {
    const city = inputRef.current?.value;
    if (!city) return;
    await fetchWeather(city);
  }, [fetchWeather]);

  const goToDetails = useCallback(() => {
    if (weather?.name) {
      router.push(`/cidade/${weather.name}`);
    }
  }, [weather, router]);
  
  const isCityFavorited = useMemo(() => {
    return weather?.name && favoriteCities.includes(weather.name);
  }, [weather, favoriteCities]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : "",
      }}
    >
      <Card className="bg-black/50 text-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Digite sua cidade"
            className="placeholder:text-white flex-1"
          />
          <button onClick={searchCity} className="p-2 rounded-2xl shadow-lg">
            <MagnifyingGlassIcon className="h-5 w-5 opacity-100" />
          </button>
          <button
            onClick={() => weather && toggleFavorite(weather.name)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <StarIcon
              className={`h-6 w-6 ${
                isCityFavorited ? "text-yellow-400" : "text-white"
              }`}
            />
          </button>
        </div>
        {isLoading ? (
          <WeatherInformationsSkeleton />
        ) : (
          <Suspense fallback={<WeatherInformationsSkeleton />}>
            {weather && <LazyWeatherInformations weather={weather} />}
          </Suspense>
        )}
        <Button
          variant="outline"
          className="flex items-center"
          onClick={goToDetails}
        >
          <span className="mr-2 text-black">Detalhes</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center w-full justify-center gap-2"
          onClick={() => router.push("/favoritos")}
        >
          <HeartIcon className="h-5 w-5 text-black" />
          <span className="text-black">Ver Favoritos</span>
        </Button>
      </Card>
    </div>
  );
}
