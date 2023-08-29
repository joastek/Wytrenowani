"use client";

import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
import { Provider } from "react-redux";

import store from "@/store/store";
import Sidebar from "@/components/Dashboard/Sidebar";
import AccountSidebar from "@/components/Dashboard/AccountSidebar";

export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <SidebarProvider>
          <Sidebar />
          {children}
          <AccountSidebar />
        </SidebarProvider>
      </Provider>
    </>
  );
}
