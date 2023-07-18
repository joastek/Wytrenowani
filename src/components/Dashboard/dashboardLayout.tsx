import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <main>{children}</main>;
    </div>
  );
};

export default DashboardLayout;
