export function getBackgroundImageForWeather (weatherCondition: string | null): string {
    switch (weatherCondition) {
      case "Rain":
        return "/assets/rain.jpg";
      case "Clear":
        return "/assets/clear-day.jpg";
      case "Clouds":
        return "/assets/some-clouds.jpg";
      case "Snow":
        return "/assets/snow.jpg";
      case "Thunderstorm":
        return "/assets/storm.jpg";
      case "Mist":
        return "/assets/mist.jpg";
      default:
        return "/assets/clear-day.jpg";
    }
  }