import React from "react";
import Navigation from "../LoginPage/Navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
const AccountSidebar = () => {
  return (
    <div className=" absolute h-screen right-0 top-0 w-48 bg-bar block">
      AcoountSidebar
      <Navigation />
      <Link href="/">
        {" "}
        <LogoutIcon />
      </Link>
    </div>
  );
};

export default AccountSidebar;
