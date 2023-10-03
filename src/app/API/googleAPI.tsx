import { useState } from "react";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
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
          <input type="text" onChange={(e) => setEventName(e.target.value)} />
          <p>Event description</p>
          <input
            type="text"
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <hr />
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
            Create Calendar Event
          </button>
          <p></p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <button onClick={() => googleSignIn()}>Sign In With Google</button>
        </>
      )}
    </>
  );
};

export default AuthAndCalendarManagement;
