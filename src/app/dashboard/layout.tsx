import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ServerSidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ServerSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
