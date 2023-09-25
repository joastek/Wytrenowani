import React from "react";
import Navigation from "../LoginPage/Navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

const AccountSidebar = () => {
  const session = useSession(); // tokens, when session exists we have a user
  return (
    <div className="absolute right-0 top-0 flex flex-row mr-12 mt-6 px-4 rounded-[2rem] h-[4rem]">
      <div className="flex items-center flex-grow">
        {" "}
        {/* Zmieniamy to na flex-grow */}
        <Navigation />
      </div>
      <Link
        href="/"
        className="bg-bar rounded-[2rem] p-2 my-4 flex items-center justify-center w-[3.5rem] drop-shadow-2xl"
      >
        <LogoutIcon />
      </Link>
    </div>
  );
};

export default AccountSidebar;
