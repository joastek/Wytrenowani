import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
import DashboardLayout from "@/components/Dashboard/dashboardLayout";

const dashboard = () => {
  return (
    <>
      <SidebarProvider>
        <DashboardLayout>
          {" "}
          <div className="w-24 h-64 bg-slate-400 ">tesstastastat</div>{" "}
        </DashboardLayout>{" "}
      </SidebarProvider>
    </>
  );
};

export default dashboard;
