"use client";
import { WeatherState } from "@/types/type";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, fetchCurrentWeather } from "@/app/API/weatherAPI";
import {
  setCurrLocation,
  setCurrentWeather,
} from "@/slice/Dashboard/weatherData";
import { FaTemperatureLow, FaWind } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import Image from "next/image";
const WeatherBox = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector(
    (state: WeatherState) => state.weather.currentWeather
  );
  const currLocation = useSelector(
    (state: WeatherState) => state.weather.currLocation
  );
  const percentage = 66;
  ///glass of water
  useEffect(() => {
    const loadData = async () => {
      try {
        // Pobierz lokalizację
        const locationData = await getLocation();
        dispatch(setCurrLocation(locationData));

        // Pobierz aktualną pogodę na podstawie lokalizacji
        const weatherData = await fetchCurrentWeather(
          locationData.latitude,
          locationData.longitude
        );
        dispatch(setCurrentWeather(weatherData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Wywołaj funkcję loadData po załadowaniu komponentu
    loadData();
  }, []);

  //   console.log(currLocation.city);
  return (
    <>
      {currentWeather && (
        <div className="columns">
          <div className="column is-three-fifths is-offset-2">
            {" "}
            <h2>{currLocation.city} </h2>
            <h4> {currentWeather.name}</h4>
            <Image
              src={`/icons/${currentWeather.weather[0].icon}.png`}
              alt="weather"
              className=" justify-center flex mx-auto"
              width={80}
              height={80}
            />
            <p className="text-[5rem] ml-8 mt-[-5%] text-contrast">
              {(currentWeather.main.temp - 273.15).toFixed(0)}
              <sup>o</sup>
            </p>{" "}
            <p className="mt-[-5%] text-sm">
              {currentWeather.weather[0].description}{" "}
            </p>
          </div>
          <div className="flex flex-col w-1/4 h-full">
            <div className="flex flex-col justify-center h-1/3 border-b border-white">
              <FaWind className="justify-center flex mx-auto w-[1.7rem] h-[1.7rem]" />{" "}
              <p className="text-sm mt-2 text-gray">Wiatr</p>
              <p className="text-sm text-gray">
                {currentWeather.wind.speed} m/s
              </p>
            </div>
            <div className="flex flex-col justify-center h-1/3   border-b border-white mt-2">
              <BsFillDropletFill className="justify-center flex mx-auto  w-[1.7rem] h-[1.7rem]" />{" "}
              <p className="text-sm mt-2 text-gray">Wilgotność</p>
              <p className="text-sm text-gray">
                {currentWeather.main.humidity}%
              </p>
            </div>
            <div className="flex flex-col justify-center h-1/3 mt-2 ">
              <FaTemperatureLow className="justify-center flex ml-[40%]  w-[1.9rem] h-[1.7rem] " />{" "}
              <p className="text-sm mt-2 text-gray">Odczuwalne </p>
              <p className="text-sm text-gray">3.4 m/s</p>
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherBox;
