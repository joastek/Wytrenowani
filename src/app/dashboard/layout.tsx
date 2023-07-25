"use client";
import DashboardLayout from "@/components/Dashboard/dashboardLayout";
import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
import { Provider } from "react-redux";
import store from "@/store/store";
export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
      </Provider>
    </>
  );
}
