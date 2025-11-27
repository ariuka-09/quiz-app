import { NavBar } from "@/app/components/NavBar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <NavBar />
      <div>
        <SidebarProvider defaultOpen={false} className="flex flex-col">
          <AppSidebar />
          <main>{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
