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
import { useState } from "react";
type ValuePiece = Date;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const dashboard = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();

  console.log(start);
  console.log(session);
  console.log(eventDescription);
  if (isLoading) {
    return <></>;
  }

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
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for google
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
  }
  return (
    <>
      <div className="flex justify-center   w-full  ">
        <div className="w-2/3 flex h-[70rem]  mt-28 justify-center ">
          <div className="bg-black w-[70rem] h-[15rem]"></div>
        </div>
        <div className="w-1/3  h-[70rem]  mt-28">
          {" "}
          <div>
            {session ? (
              <>
                <h2>Hey there {session.user.email}</h2>
                <p>Start of your event</p>
                <DateTimePicker onChange={setStart} value={start} />
                <p>End of your event</p>
                <DateTimePicker onChange={setEnd} value={end} />
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
