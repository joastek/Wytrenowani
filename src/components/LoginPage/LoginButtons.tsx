"use client";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const supabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_AUTHORIZATION_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_AUTHORIZATION_CODE}`
);

const LoginButtons = () => {
  const router = useRouter();
  useEffect(() => {
    const authChangeHandler = async (event: any) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    };

    supabase.auth.onAuthStateChange(authChangeHandler);
  }, [router]);
  return (
    <>
      {" "}
      <div className="w-full flex p-16 flex-col justify-center items-center">
        <div className=" m-6">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["google", "facebook", "github"]}
          />
        </div>
        <div>
          {" "}
          <Link href="/dashboard">
            {" "}
            <Button
              variant="outlined"
              className="m-auto  place-items-center text-white bg-gradient-to-br from-secondary to-third  font-light rounded-lg text-lg px-5 py-2.5 text-center "
            >
              Zaloguj jako gość
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginButtons;
