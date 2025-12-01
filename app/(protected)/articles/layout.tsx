import { NavBar } from "@/app/components/NavBar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false} className="">
      <div className="flex w-full flex-col">
        <NavBar />

        <div className="">
          <AppSidebar />
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
