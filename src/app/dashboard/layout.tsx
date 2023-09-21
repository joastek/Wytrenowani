"use client";

import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
import { Provider } from "react-redux";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import store from "@/store/store";
import Sidebar from "@/components/Dashboard/Sidebar";
import AccountSidebar from "@/components/Dashboard/AccountSidebar";

const supabase = createClient(
  "https://stvkcwqqiszetklseils.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmtjd3FxaXN6ZXRrbHNlaWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzMTU1MTAsImV4cCI6MjAxMDg5MTUxMH0.sL41P_Y1oRDCLpx-PuzjUCO3--YPr0XcJ38Zrvw5Xmw"
);
export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <SessionContextProvider supabaseClient={supabase}>
          {" "}
          <SidebarProvider>
            <Sidebar />

            {children}

            <AccountSidebar />
          </SidebarProvider>{" "}
        </SessionContextProvider>
      </Provider>
    </>
  );
}
