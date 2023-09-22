"use client";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
const dashboard = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const session = useSession(); //tokens
  const supabase = useSupabaseClient(); ///
  const { isLoading } = useSessionContext();
  console.log(start);
  console.log(session);
  console.log(eventDescription);
  if (isLoading) {
    return <></>;
  }
  async function googleSingin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with SUpabase");
      console.log(error);
    }
  }
  async function singOut() {
    await supabase.auth.signOut();
  }
  async function createCalendarEvent() {
    await supabase.auth.signOut();
  }
  return (
    <>
      <main className="text-black bg-slate-100  h-24 w-screen text-right  dark:bg-secondary ">
        <div className="flex justify-center items-center  flex-col h-screen">
          <div className="h-64 w-full bg-slate-400 p-4 flex justify-center items-center">
            <div className="w-[40rem] m-[3rem]">
              {session ? (
                <>
                  <h2>Cześć {session.user.email}</h2>
                  <h2>Zacznij event</h2>
                  <DateTimePicker onChange={setStart} value={start} />
                  <h2>zakoncz event</h2>
                  <DateTimePicker onChange={setEnd} value={end} />
                  <h2>nazwa eventu</h2>
                  <input
                    type="text"
                    onChange={(e) => setEventName(e.target.value)}
                  ></input>
                  <h2>deskryocja eventu</h2>
                  <input
                    type="text"
                    onChange={(e) => setEventDescription(e.target.value)}
                  ></input>
                  <hr />
                  <button onClick></button>create calendar event</button>
                  <p> </p>
                  <button onClick={() => singOut()}>Sing out</button>
                </>
              ) : (
                <>
                  <button onClick={() => googleSingin()}>Sing in</button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>{" "}
    </>
  );
};

export default dashboard;
