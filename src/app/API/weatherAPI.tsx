import axios from "axios";
import {
  WeatherData,
  initialWeatherData,
  GeolocalizationData,
  initialGeolocalizationData,
} from "@/types/type";



const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "e1af2622031195f43d1d95b3c9b21403";
console.log("test22");


export const getLocation = async () => {
  try {
    const location = await axios.get("https://ipapi.co/json/");
    return location.data;
  } catch (error) {
    console.error("Error getting location:", error);
    return initialGeolocalizationData; // Return default data in case of an error
  }
};

export const fetchCurrentWeather = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=pl`
    );
    const weatherResponse = await response.json();

    if (weatherResponse && weatherResponse.name) {
      return weatherResponse as WeatherData;
    } else {
      console.error("Invalid API response or missing 'name' property");
      return initialWeatherData; // Return default data in case of an error
    }
  } catch (error) {
    console.error("Error fetching current weather:", error);
    return initialWeatherData; // Return default data in case of an error
  }
};