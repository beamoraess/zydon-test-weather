"use client";

import { DailyForecast } from "@/app/types";
import { useWeather } from "@/context/WeatherContext";
import { getBackgroundImageForWeather } from "@/utils/backgroundImage";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

export default function CityWeather() {
  const { weather, forecast } = useWeather();
  const router = useRouter();

  if (!weather || !forecast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          Não foi possível carregar os dados. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  const hourlyForecast = forecast.list.slice(0, 8).map((entry) => ({
    time: entry.dt_txt.split(" ")[1].slice(0, 5),
    temperature: Math.round(entry.main.temp),
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 text-black px-4 py-2 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">{payload[0].value}°C</p>
        </div>
      );
    }
    return null;
  };

  const dailyForecast = forecast.list.reduce(
    (acc: Record<string, DailyForecast>, entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = {
          date: new Date(entry.dt * 1000).toLocaleDateString("pt-BR", {
            weekday: "short",
          }),
          temp_min: entry.main.temp_min,
          temp_max: entry.main.temp_max,
          weather: {
            icon: entry.weather[0].icon,
            description: entry.weather[0].description,
          },
        };
      } else {
        acc[date].temp_min = Math.min(acc[date].temp_min, entry.main.temp_min);
        acc[date].temp_max = Math.max(acc[date].temp_max, entry.main.temp_max);
      }
      return acc;
    },
    {} as Record<string, DailyForecast>
  );

  const dailyForecastArray = Object.values(dailyForecast).slice(0, 5);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('${getBackgroundImageForWeather(
            weather.weather[0].main || "default"
        )}')`,
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>
      <div className="bg-black/50 text-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Ícone do Clima"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{weather.name}</h1>
              <p className="text-base md:text-lg capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="text-4xl md:text-5xl font-bold">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 p-2 md:p-3 rounded-lg">
              <i className="fas fa-temperature-three-quarters text-white text-lg md:text-xl"></i>
              <p className="text-base md:text-lg">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>
            <div className="flex items-center gap-2 p-2 md:p-3 rounded-lg">
              <i className="fas fa-sun text-white text-lg md:text-xl"></i>
              <p className="text-base md:text-lg">
                {Math.round(weather.main.feels_like)}
              </p>
            </div>
            <div className="flex items-center gap-2 p-2 md:p-3 rounded-lg">
              <i className="fas fa-wind text-white text-lg md:text-xl"></i>
              <p className="text-base md:text-lg">{weather.wind.speed} km/h</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Temperatura nas Próximas 24 Horas
          </h2>
          <div className="h-32 md:h-48 bg-white/20 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyForecast}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.2)"
                />
                <XAxis dataKey="time" stroke="white" />
                <YAxis stroke="white" domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#4DB6AC"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {dailyForecastArray.map((day, index) => (
            <div key={index} className="bg-white/10 p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">{day.date}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                alt="Ícone do Clima"
                className="w-10 h-10 md:w-12 md:h-12 mx-auto"
              />
              <p className="text-xl">{Math.round(day.temp_max)}°C</p>
              <p className="text-sm">{Math.round(day.temp_min)}°C</p>
              <p className="text-sm capitalize">{day.weather.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
