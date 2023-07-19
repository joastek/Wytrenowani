import DashboardLayout from "@/components/Dashboard/dashboardLayout";
import { SidebarProvider } from "@/components/Dashboard/SideBarContext";
export default function DashboardLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </SidebarProvider>
    </>
  );
}
