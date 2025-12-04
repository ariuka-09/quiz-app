"use client";
import { article } from "@/app/lib/type";
import { axiosInstance } from "@/app/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function AppSidebar() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [history, setHistory] = useState<{ title: string; id: number }[]>();
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const history = await axiosInstance.get("/article");
    console.log("history", history);
    const data = history.data.map((article: article) => {
      return { title: article.title, id: article.id };
    });
    console.log("data of history", data);

    setHistory(data);
  };

  return (
    <Sidebar className="flex justify-end align-bottom mt-14 ">
      <SidebarHeader className="relative">
        {sidebar.state == "expanded" && (
          <p className="flex justify-start px-1 items-center font-semibold">
            History
          </p>
        )}

        <SidebarTrigger className="absolute right-3" />
      </SidebarHeader>
      {/* <SidebarContent>
    
      </SidebarContent> */}
      {sidebar?.state == "expanded" && (
        <SidebarContent className="flex ">
          <ScrollArea className="pb-30">
            <div className="flex flex-col mt-3">
              {history?.map((e, i) => {
                return (
                  <div key={i}>
                    {e.title && (
                      <div
                        onClick={() => {
                          router.push(`/articles/summary/${e.id}`);
                        }}
                        className="font-medium text-base my-1.5 mx-3 hover:bg-[#c3c1c1] rounded p-1 cursor-pointer"
                      >
                        {e.title}
                      </div>
                    )}
                  </div>
                );
              })}
              <p></p>
            </div>
          </ScrollArea>
        </SidebarContent>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
