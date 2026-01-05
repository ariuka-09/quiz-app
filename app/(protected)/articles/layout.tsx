import { NavBar } from "@/app/components/NavBar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-full flex-col">
        <NavBar />

        <div className="flex  ">
          <AppSidebar />
          <main className="mt-30 w-screen flex justify-center">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
