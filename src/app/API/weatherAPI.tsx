const options = {
  method: "GET",

  headers: {
    "X-RapidAPI-Key": "c0f899fe3emshb10b3c849debb77p174190jsne3f1256f053f",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
fetch("/cities", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "e1af2622031195f43d1d95b3c9b21403";
console.log("test22");
