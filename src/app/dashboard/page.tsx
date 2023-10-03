"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/types/type";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { getLocation, fetchCurrentWeather } from "../API/weatherAPI";
import {
  WeatherData,
  initialWeatherData,
  GeolocalizationData,
  initialGeolocalizationData,
} from "@/types/type";
import AuthAndCalendarManagement from "../API/googleAPI";
import Image from "next/image";

const dashboard = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  const percentage = 66;
  ///glass of water
  const [fillLevel, setFillLevel] = useState(-50);

  /////////////////////
  /// WeatherApi
  const [currentWeather, setCurrentWeather] =
    useState<WeatherData>(initialWeatherData);
  const [currLocation, setCurrLocation] = useState<GeolocalizationData>(
    initialGeolocalizationData
  );

  useEffect(() => {
    const getLocationData = async () => {
      const locationData = await getLocation();
      setCurrLocation(locationData);
    };
    getLocationData();
  }, []);

  const handleCurrentWeatherClick = async () => {
    try {
      const weatherData = await fetchCurrentWeather(
        currLocation.latitude,
        currLocation.longitude
      );
      setCurrentWeather(weatherData);
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  ////////////////
  // Funkcja do napełniania szklanki
  const handleFillClick = () => {
    if (fillLevel < 100) {
      // Max poziom napełnienia szklanki
      setFillLevel((prevFillLevel) => prevFillLevel + 10); // Możesz dostosować tempo napełniania
    }
  };
  const handleAddClick = () => {
    if (fillLevel < 100) {
      setFillLevel((prevFillLevel) => prevFillLevel + 10);
    }
  };

  const handleRemoveClick = () => {
    if (fillLevel > -50) {
      setFillLevel((prevFillLevel) => prevFillLevel - 10);
    }
  };
  return (
    <>
      <div className="flex justify-center   w-full  ">
        <div className="flex  flex-wrap max-w-[70rem] mt-28  ml-28">
          <div className="bg-bar w-[70rem] h-[17rem] z-50 rounded-[2rem] relative">
            <h2 className="absolute left-4 top-4">Witaj User !</h2>{" "}
            <Image src="/icons/01n.png" alt="weather" width={50} height={50} />
          </div>{" "}
          <div className="w-[20rem] max-h-[17rem]  bg-bar rounded-[2rem] mt-6">
            <h3 className="mb-4">Suma kcal :</h3>
            <CircularProgressbar
              value={totalCalories}
              maxValue={calories}
              text={` \n ${totalCalories}/${calories} kcal`}
              className=" p-6 max-w-[20rem] max-h-[14rem]"
              styles={buildStyles({
                textColor: "white",
                textSize: "0.7rem",
                pathColor: `rgb(87, 204, 153, ${percentage / 100})`,
              })}
            />
          </div>
          <div className="w-[27rem] bg-bar ml-6 mt-6">
            {" "}
            <button onClick={handleCurrentWeatherClick}>
              Pobierz aktualną pogodę
            </button>
            {/* Wyświetlanie danych pogodowych */}
            {currentWeather && (
              <div>
                <h2>Aktualna pogoda w {currLocation.city}</h2>
                <p>Temperatura: {currentWeather.main.temp} K</p>
                <p>Opis pogody: {currentWeather.weather[0].description}</p>
                <p>Wilgotność: {currentWeather.main.humidity}%</p>
                <p>Prędkość wiatru: {currentWeather.wind.speed} m/s</p>
                <p>Prędkość wiatru: {currentWeather.name} m/s</p>

                <Image
                  src={`/icons/${currentWeather.weather[0].icon}.png`}
                  alt="weather"
                  width={50}
                  height={50}
                />
              </div>
            )}
          </div>
          <div className="w-[20rem] block ml-6 mt-6">
            <div className="h-[7.75rem] bg-bar ">
              <div className="water">
                <div
                  className="wave "
                  style={{ bottom: `${fillLevel}%` }}
                ></div>
              </div>
            </div>
            <div className="h-[7.75rem] bg-bar mt-6">
              {" "}
              <div className="water-level">{fillLevel + 50}%</div>
            </div>
          </div>
          <div className="w-[35rem]">
            {" "}
            <div className="water-level">
              {fillLevel}ddddddd%
              <button onClick={handleAddClick}>Dodaj do szklanki</button>
              <button onClick={handleRemoveClick}>Odejmij z szklanki</button>
            </div>
          </div>
        </div>
        <div className="    mt-28 mr-8 justify-start">
          {" "}
          <div className="bg-bar  max-w-[35rem] h-[17rem] rounded-[2rem] p-4 ml-6">
            <AuthAndCalendarManagement />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
