import { useState } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
// import DateTimePicker from "react-datetime-picker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Textarea } from "@mui/joy";
import dayjs from "dayjs";
interface CalendarEvent {
  eventName: string;
  eventDescription: string;
  start: DateTime; // Zakładając użycie Luxon do obsługi daty i czasu
  end: DateTime;
}
const AuthAndCalendarManagement = () => {
  const { isLoading } = useSessionContext();
  const supabase = useSupabaseClient();
  const session = useSession();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
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

  if (isLoading) {
    return <>Loading.....</>;
  }
  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent(event: CalendarEvent) {
    console.log("Creating calendar event");
    const { eventName, eventDescription, start, end } = event;
    const eventPayload = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISO(), // Używamy toISO() z Luxon do formatowania daty
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISO(), // Używamy toISO() z Luxon do formatowania daty
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    if (session) {
      try {
        const response = await fetch(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + session.provider_token,
            },
            body: JSON.stringify(eventPayload),
          }
        );
        const data = await response.json();
        console.log(data);
        alert("Event created, check your Google Calendar!");
      } catch (error) {
        console.error("Error creating calendar event:", error);
      }
    } else {
      console.error("Session is null. Please sign in.");
    }
  }

  return (
    <>
      {session ? (
        <>
          <h2>Witaj {session.user.email}</h2>
          <p>Rozpoczęcie wydarzenia</p>
          <MobileDateTimePicker
            onChange={(value) => setStart(new Date(dayjs(value).toISOString()))}
            value={dayjs(start)}
          />
          <p>Zakończenie wydarzenia</p>
          <MobileDateTimePicker
            onChange={(value) => setEnd(new Date(dayjs(value).toISOString()))}
            value={dayjs(end)}
          />
          <p>Nazwa wydarzenia</p>
          <textarea rows={5} />
          <FormControl onChange={(e) => setEventName(e.target.value)}>
            <Input
              placeholder="Wpisz nazwę wydarzenia "
              slotProps={{
                input: {
                  className:
                    "w-full text-sm font-normal bg-transparent font-sans leading-normal text-white dark:text-slate-300 dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg hover:dark:bg-slate-900 hover:border-slate-400 hover:dark:border-slate-700 focus:outline-0 focus:shadow-outline-purple",
                },
              }}
            />
          </FormControl>

          <p>Opis wydarzenia</p>
          <FormControl onChange={(e) => setEventDescription(e.target.value)}>
            <Input
              placeholder="Wpisz opis wydarzenia "
              slotProps={{
                input: {
                  className:
                    "w-full text-sm font-normal bg-transparent font-sans leading-normal text-white dark:text-slate-300 dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg hover:dark:bg-slate-900 hover:border-slate-400 hover:dark:border-slate-700 focus:outline-0 focus:shadow-outline-purple",
                },
              }}
            />
          </FormControl>

          <button
            onClick={() =>
              createCalendarEvent({
                eventName: eventName,
                eventDescription: eventDescription,
                start: DateTime.fromJSDate(start),
                end: DateTime.fromJSDate(end),
              })
            }
          >
            Dodaj wydarzenie
          </button>
          <p></p>
          <button onClick={() => signOut()}>Wyloguj się</button>
        </>
      ) : (
        <>
          <button onClick={() => googleSignIn()}>Zaloguj się z google</button>
        </>
      )}
    </>
  );
};

export default AuthAndCalendarManagement;
