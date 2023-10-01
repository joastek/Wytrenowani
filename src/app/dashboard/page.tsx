"use client";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import { useState, useEffect } from "react";
import { RootState } from "@/types/type";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../API/weatherAPI";
import Image from "next/image";
// import "@/styles/globals.css";
type ValuePiece = Date;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const dashboard = () => {
  const { totalProtein, totalCarbo, totalFat, totalCalories } = useSelector(
    (state: any) => state.nutriensSum
  );

  const { calories, result, mass } = useSelector(
    (state: RootState) => state.bmiCalculator
  );

  const percentage = 66;
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  const axios = require("axios");
  ///////////////////
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  /////////////////
  const [fillLevel, setFillLevel] = useState(0);
  const [currLocation, setCurrLocation] = useState<{
    city: string;
    region: string;
    longitude: string;
    latitude: string;
  }>({ city: "", region: "", longitude: "", latitude: "" });
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json/");
    setCurrLocation(location.data);
  };
  useEffect(() => {
    getLocation();
  }, []);
  console.log(start);
  console.log(session);
  console.log(eventDescription);
  console.log("test");
  //////////////////////
  const fetchCurrentWeather = async () => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${currLocation.latitude}&lon=${currLocation.longitude}&appid=${WEATHER_API_KEY}&lang=pl`
      );
      const weatherResponse = await response.json();

      if (weatherResponse && weatherResponse.name) {
        setCurrentWeather(weatherResponse);
      } else {
        console.error(
          "Nieprawidłowa odpowiedź API lub brak właściwości 'name'"
        );
      }
    } catch (error) {
      console.error("Błąd podczas pobierania aktualnej pogody:", error);
    }
  };
  const handleCurrentWeatherClick = () => {
    fetchCurrentWeather();
  };
  console.log(currentWeather);
  //////////
  if (isLoading) {
    return <></>;
  }
  fetch("https://ipapi.co/ip/")
    .then(function (response) {
      response.text().then((txt) => {
        console.log(txt);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
      end: {
        dateTime: end.toISOString(), // Date.toISOString() ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
      },
    };
    if (session) {
      // Check if session is not null
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
          body: JSON.stringify(event),
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          alert("Event created, check your Google Calendar!");
        });
    } else {
      // Handle the case where session is null (e.g., show an error message)
      console.error("Session is null. Please sign in.");
    }
  }
  /////////////////

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
    if (fillLevel > 0) {
      setFillLevel((prevFillLevel) => prevFillLevel - 10);
    }
  };
  return (
    <>
      <div className="flex justify-center   w-full  ">
        <div className="flex  flex-wrap max-w-[70rem] mt-28  ml-28">
          <div className="bg-bar w-[70rem] h-[17rem] z-50 rounded-[2rem] relative">
            <h2 className="absolute left-4 top-4">
              Witaj User ! {currLocation.city}
              {currLocation.region}
              {currLocation.longitude}
              {currLocation.latitude}
            </h2>{" "}
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
                {" "}
                <div
                  className="progress"
                  style={{ height: `${fillLevel}%` }}
                ></div>
              </div>
            </div>
            <div className="h-[7.75rem] bg-bar mt-6">
              {" "}
              <div className="water-level">{fillLevel}%</div>
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
            {session ? (
              <>
                <h2>Hey there {session.user.email}</h2>
                <p>Start of your event</p>
                <DateTimePicker
                  onChange={(value) => setStart(value as Date)}
                  value={start}
                />
                <p>End of your event</p>
                <DateTimePicker
                  onChange={(value) => setEnd(value as Date)}
                  value={end}
                />
                <p>Event name</p>
                <input
                  type="text"
                  onChange={(e) => setEventName(e.target.value)}
                />
                <p>Event description</p>
                <input
                  type="text"
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <hr />
                <button onClick={() => createCalendarEvent()}>
                  Create Calendar Event
                </button>
                <p></p>
                <button onClick={() => signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={() => googleSignIn()}>
                  Sign In With Google
                </button>
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
