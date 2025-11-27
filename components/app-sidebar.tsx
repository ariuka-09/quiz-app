"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const sidebar = useSidebar();
  return (
    <Sidebar className="flex justify-end align-bottom">
      <SidebarHeader className="relative">
        <SidebarTrigger className="absolute right-3" />
      </SidebarHeader>
      {/* <SidebarContent>
    
      </SidebarContent> */}
      {sidebar?.state == "expanded" && (
        <SidebarContent>
          <div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              omnis, ipsum cum vero odio, ab voluptatem et rerum illum nulla
              velit unde beatae veniam quisquam ex nisi aspernatur ea? Dolorum.
            </p>
            <p>text</p>
            <p>text</p>
          </div>
        </SidebarContent>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
