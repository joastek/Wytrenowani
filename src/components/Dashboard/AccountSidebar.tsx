import React from "react";
import Navigation from "../LoginPage/Navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const supabase = createClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_AUTHORIZATION_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_AUTHORIZATION_CODE}`
);

const AccountSidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);
  async function singOutUser() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
    console.log(error);
  }
  return (
    <div className="absolute right-0 top-0 flex flex-row mr-12 mt-6 px-4 rounded-[2rem] h-[4rem]">
      <div className="flex items-center flex-grow">
        {" "}
        {/* Zmieniamy to na flex-grow */}
        <Navigation />
      </div>
      {Object.keys(user).length !== 0 ? (
        <>
          {" "}
          <Button
            onClick={() => singOutUser()}
            className="bg-bar rounded-[2rem] p-2 my-4 flex items-center justify-center w-[3.5rem] drop-shadow-2xl"
          >
            <LogoutIcon />
          </Button>
        </>
      ) : (
        <>
          <div className="bg-gray fixed top-0 left-0 w-full h-full z-50">
            <div className="top-[50%] left-[50%] z-50 absolute flex flex-col">
              <p>Nie jesteś zalogowany</p>
              <Button className=" top-[50%] left-[50%] z-50 ">
                <Link href="/"> Zaloguj się</Link>
              </Button>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSidebar;
