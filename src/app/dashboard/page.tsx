"use client";

import { useState, useEffect } from "react";
import { RootState } from "@/types/type";
import {
  CircularProgressbarWithChildren,
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import { useSelector, useDispatch } from "react-redux";
import {
  getLocation,
  fetchCurrentWeather,
} from "../../components/API/weatherAPI";
import { WeatherState } from "@/types/type";
import {
  setCurrLocation,
  setCurrentWeather,
} from "@/slice/Dashboard/weatherData";
// import AuthAndCalendarManagement from "../../components/API/googleAPI";
import Image from "next/image";
import WaterFill from "@/components/Dashboard/WaterFill";
import NumberOfSteps from "@/components/Dashboard/NumberOfSteps";
import "@/styles/DashboardWave.css";
import "@/styles/theme.css";
import MotivationalQuotes from "@/components/Dashboard/MotivationalQuotes";
import "react-circular-progressbar/dist/styles.css";
import { FaWind, FaTemperatureLow } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { Button } from "@mui/material";

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
  // console.log(handleCurrentWeatherClick);
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
          <div className="w-[20rem] max-h-[17rem]  bg-[#293556] rounded-[1rem] mt-6 justify-center flex flex-row text-center shadow-3xl">
            <CircularProgressbar
              value={totalCalories}
              maxValue={calories}
              text={`  ${totalCalories}/${calories} kcal`}
              className="p-6 max-w-[20rem] max-h-[16rem]"
              styles={buildStyles({
                textColor: "white",
                textSize: "0.7rem",
                pathColor: "#EDB90C",
                trailColor: "#000",
              })}
            />
          </div>
          <div className="w-[27rem] weather_box  ml-6 mt-6  rounded-[1rem]  shadow-3xl p-2 flex justify-center text-center relative">
            {" "}
            <button
              // onClick={handleCurrentWeatherClick}
              className="absolute left-4 top-4"
            >
              <BiRefresh className=" w-[2rem] h-[2rem]" />
            </button>
            {/* Wyświetlanie danych pogodowych */}
            {currentWeather && (
              <>
                <div className=" flex-col w-3/4">
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
                    <FaTemperatureLow className="justify-center flex ml-[40%]  w-[1.7rem] h-[1.7rem] " />{" "}
                    <p className="text-sm mt-2 text-gray">Odczuwalne </p>
                    <p className="text-sm text-gray">3.4 m/s</p>
                  </div>
                </div>
              </>
            )}
            2424
          </div>
          <div className="w-[20rem] block ml-6 mt-6">
            <div className="h-[7.75rem] bg-bgcontrastpurple flex p-4  rounded-[1rem]  shadow-3xl ">
              <WaterFill />
            </div>
            <div className="h-[7.75rem] bg-bgcontrastpurple mt-4 p-4 rounded-[1rem]  shadow-3xl">
              {" "}
              <NumberOfSteps />
            </div>
          </div>
          <div className="flex h-[17rem] w-full mt-6  ">
            {" "}
            <div className=" bg-bar  w-1/2 rounded-[1rem] relative  shadow-3xl p-4">
              {" "}
              wwdddddddddddddddddddddddddddddddddddddddddddddddddddddd
            </div>{" "}
            <div className=" bg-bar  w-1/2  ml-6 rounded-[1rem] relative  shadow-3xl  p-4">
              {" "}
              dwadwad
            </div>
          </div>
        </div>
        <div className="    mt-28 mr-8 justify-start">
          {" "}
          <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[3/4] rounded-[1rem] p-4 ml-6  shadow-3xl">
            {/* <AuthAndCalendarManagement /> */}
          </div>
          <div className="bg-bgcontrastpurple  max-w-[35rem] max-h-[1/4] rounded-[1rem] p-4 ml-6  mt-4  shadow-3xl">
            {/* <AuthAndCalendarManagement /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
