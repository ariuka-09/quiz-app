import { NavBar } from "@/app/components/NavBar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="">
      <AppSidebar />
      <div className="flex flex-col w-full">
        <NavBar />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
