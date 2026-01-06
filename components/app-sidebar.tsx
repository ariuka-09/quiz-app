"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { axiosInstance } from "@/app/lib/utils";
import { article } from "@/app/lib/type";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function AppSidebar() {
  const router = useRouter();
  const params = useParams();
  const { state } = useSidebar(); // "expanded" or "collapsed"
  const [history, setHistory] = useState<
    { title: string; id: number }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/article");
      const data = response.data.map((art: article) => ({
        title: art.title,
        id: art.id,
      }));
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // We use collapsible="icon" but we will manually control the content visibility
    <Sidebar collapsible="icon" className="mt-14 border-r border-border">
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-2 min-h-[48px]">
        {state === "expanded" && (
          <span className="font-semibold text-sm text-muted-foreground animate-in fade-in duration-300">
            History
          </span>
        )}
        <SidebarTrigger className={state === "collapsed" ? "mx-auto" : ""} />
      </SidebarHeader>

      {/* Logic: Only render SidebarContent if expanded. 
          This ensures the history is FULLY hidden when collapsed.
      */}
      {state === "expanded" && (
        <SidebarContent className="animate-in fade-in slide-in-from-left-2 duration-300">
          <SidebarGroup>
            <ScrollArea className="h-[calc(100vh-10rem)] px-2">
              <SidebarMenu>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <SidebarMenuItem key={i} className="mb-2">
                        <Skeleton className="h-9 w-full rounded-md" />
                      </SidebarMenuItem>
                    ))
                  : history?.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() =>
                            router.push(`/articles/summary/${item.id}`)
                          }
                          isActive={params?.id === String(item.id)}
                          className="hover:bg-accent hover:text-accent-foreground py-5"
                        >
                          <span className="truncate text-sm font-medium">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroup>
        </SidebarContent>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
