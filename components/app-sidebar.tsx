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

export function AppSidebar() {
  const router = useRouter();
  const sidebar = useSidebar();
  const [history, setHistory] = useState<{ title: string; id: number }[]>();
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
        <SidebarTrigger className="absolute right-3" />
      </SidebarHeader>
      {/* <SidebarContent>
    
      </SidebarContent> */}
      {sidebar?.state == "expanded" && (
        <SidebarContent>
          <div className="flex flex-col gap-">
            {history?.map((e, i) => {
              return (
                <div key={i}>
                  {e.title && (
                    <div
                      onClick={() => {
                        router.push(`/articles/summary/${e.id}`);
                      }}
                      className="font-medium text-base py-2.5 "
                    >
                      {e.title}
                    </div>
                  )}
                </div>
              );
            })}
            <p></p>
          </div>
        </SidebarContent>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
