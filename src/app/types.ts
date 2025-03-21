export interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
  }

  export interface WeatherData {
    city: string;
    temp: number;
    condition: string;
    description: string;
  }

 export interface DailyForecast {
    date: string;
    temp_min: number;
    temp_max: number;
    weather: {
      icon: string;
      description: string;
    };
  }

  export interface ForecastData {
    list: Array<{
      dt_txt: any;
      dt: number;
      main: {
        temp_max: number;
        temp_min: number;
        temp: number;
      };
      weather: Array<{
        icon: string;
        main: string;
        description: string;
      }>;
    }>;
  }
  
  export interface FavoriteCitiesContextType {
    favoriteCities: string[];
    toggleFavorite: (city: string) => void;
  }