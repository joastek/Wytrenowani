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
import Button from "@mui/material/Button";
import { useUser } from "@/components/hooks/useUser";
import { toast } from "react-hot-toast";

const AccountSidebar = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();
  const [user1, setUser] = useState({});
  // useEffect(() => {
  //   async function getUserData() {
  //     const { error } = await supabaseClient.auth.getUser().then((value) => {
  //       if (value.data?.user) {
  //         console.log(value.data.user.id);
  //         setUser(value.data.user);
  //       }
  //     });
  //   }
  //   getUserData();
  // }, []);
  async function singOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    router.push("/");
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Wylogowano pomyślnie!");
    }
  }
  return (
    <div className="fixed right-0 top-0 flex flex-row mr-5 mt-5 px-4 rounded-[2rem] h-[4rem]">
      <div className="flex items-center flex-grow">
        {" "}
        {/* Zmieniamy to na flex-grow */}
        {/* <Navigation /> */}
      </div>
      {user ? (
        <>
          {" "}
          <Button
            sx={{
              "&.MuiButton-text ": {
                borderRadius: 4,
                color: "#101820",
                width: 50,
                height: 60,
                background: "#EDB90C",
              },
            }}
            onClick={() => singOutUser()}
            className="bg-bar rounded-[2rem] px-2 my-2 flex items-center justify-center w-[2.5rem] drop-shadow-2xl"
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
