"use client";
import Link from "next/link";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
const LoginButtons = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const [firstLogin, setFirstLogin] = useState(false);
  useEffect(() => {
    const authChangeHandler = async (event: any) => {
      if (event === "SIGNED_IN" && !firstLogin) {
        setFirstLogin(true);
      }
    };

    supabaseClient.auth.onAuthStateChange(authChangeHandler);
  }, [supabaseClient]);

  useEffect(() => {
    if (firstLogin) {
      router.push("/dashboard");
    }
  }, [firstLogin, router]);

  return (
    <>
      {" "}
      <div className="bg-contrast w-full flex p-16 flex-col justify-center items-center shadow-3xl rounded-[2rem]">
        <div className=" m-2 ">
          <p className="m-auto text-3xl text-center justify-center flex">
            {" "}
            Zaloguj się
          </p>

          <Auth
            magicLink
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["github"]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Twój adres email",
                  password_label: "Twoje hasło",
                  button_label: "Zaloguj się",
                  loading_button_label: "Logowanie ...",
                  link_text: "Posiadasz już konto? Zaloguj się",
                  email_input_placeholder: "Adres email",
                  password_input_placeholder: "Hasło",
                },
                magic_link: {
                  link_text: "Sprawdź email z magicznym linkiem",
                  email_input_label: "Podaj adres email",
                  email_input_placeholder: "Adres email",
                  confirmation_text: "test",
                },
                sign_up: {
                  link_text: "Nie posiadasz konta? Zarejestruj się ",
                  password_label: "Stwórz hasło",
                  email_label: "Podaj adres email",
                  email_input_placeholder: "Adres email",
                  password_input_placeholder: "Hasło",
                  button_label: "Zarejestruj się",
                  loading_button_label: "LOgowanie",
                },
                forgotten_password: {
                  email_label: "Twój adres email",
                  email_input_placeholder: "Adres email",
                  link_text: "Zapomniałeś hasła?",
                  button_label: " Zresetuj hasło",
                },
              },
            }}
          />
        </div>
        <div>
          {" "}
          {/* <Link href="/dashboard">
            {" "}
            <Button
              variant="outlined"
              className="m-auto  place-items-center text-white bg-gradient-to-br from-secondary to-third  font-light rounded-lg text-lg px-5 py-2.5 text-center "
            >
              Zaloguj jako gość
            </Button>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default LoginButtons;
