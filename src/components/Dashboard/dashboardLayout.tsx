import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AccountSidebar from "./AccountSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>;
      <AccountSidebar />
    </div>
  );
};

export default DashboardLayout;
