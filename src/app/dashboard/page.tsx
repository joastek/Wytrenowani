"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/types/type";
import {
  CircularProgressbarWithChildren,
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import { useSelector, useDispatch } from "react-redux";
import { getLocation, fetchCurrentWeather } from "../API/weatherAPI";
import { WeatherState } from "@/types/type";
import {
  setCurrLocation,
  setCurrentWeather,
} from "@/slice/Dashboard/weatherData";
import AuthAndCalendarManagement from "../API/googleAPI";
import Image from "next/image";
import WaterFill from "@/components/Dashboard/WaterFill";
import NumberOfSteps from "@/components/Dashboard/NumberOfSteps";
import "@/styles/DashboardWave.css";
import MotivationalQuotes from "@/components/Dashboard/MotivationalQuotes";
import "react-circular-progressbar/dist/styles.css";
const dashboard = () => {
  const dispatch = useDispatch();
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );
  const currentWeather = useSelector(
    (state: WeatherState) => state.weather.currentWeather
  );
  const currLocation = useSelector(
    (state: WeatherState) => state.weather.currLocation
  );
  const percentage = 66;
  ///glass of water
  const value = 0.66;
  useEffect(() => {
    const getLocationData = async () => {
      const locationData = await getLocation();
      dispatch(setCurrLocation(locationData));
    };
    getLocationData();
  }, [dispatch]);

  const handleCurrentWeatherClick = async () => {
    try {
      const weatherData = await fetchCurrentWeather(
        currLocation.latitude,
        currLocation.longitude
      );
      dispatch(setCurrentWeather(weatherData));
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center   w-full  ">
        <div className="flex  flex-wrap max-w-[70rem] mt-28  ml-28">
          <div className="bg-bar w-[70rem] h-[17rem]  rounded-[1rem] relative  shadow-3xl">
            <div className="box">
              <MotivationalQuotes />
              <div className="box-inner"></div>
            </div>
          </div>{" "}
          <div className="w-[20rem] max-h-[17rem]  bg-bar rounded-[1rem] mt-6 justify-center flex flex-row text-center shadow-3xl">
            <CircularProgressbar
              value={totalCalories}
              maxValue={calories}
              text={`  ${totalCalories}/${calories} kcal`}
              className="p-6 max-w-[20rem] max-h-[16rem]"
              styles={buildStyles({
                textColor: "white",
                textSize: "0.7rem",
                pathColor: "#f00",
                trailColor: "#000",
              })}
            />
          </div>
          <div className="w-[27rem] bg-bar ml-6 mt-6  rounded-[1rem]  shadow-3xl">
            {" "}
            <button onClick={handleCurrentWeatherClick}>
              Pobierz aktualną pogodę
            </button>
            {/* Wyświetlanie danych pogodowych */}
            {currentWeather && (
              <div>
                <h2>Aktualna pogoda w {currLocation.city}</h2>
                <p>
                  Temperatura: {(currentWeather.main.temp - 273.15).toFixed(1)}{" "}
                  C
                </p>
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
            <div className="h-[7.75rem] bg-bar flex p-4  rounded-[1rem]  shadow-3xl">
              <WaterFill />
            </div>
            <div className="h-[7.75rem] bg-bar mt-6 p-4 rounded-[1rem]  shadow-3xl">
              {" "}
              <NumberOfSteps />
            </div>
          </div>
          <div className="w-[35rem]"> </div>
        </div>
        <div className="    mt-28 mr-8 justify-start">
          {" "}
          <div className="bg-bar  max-w-[35rem] h-[17rem] rounded-[2rem] p-4 ml-6  shadow-3xl">
            <AuthAndCalendarManagement />
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
