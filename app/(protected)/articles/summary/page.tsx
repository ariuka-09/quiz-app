"use client";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { ChangeEventHandler, ReactEventHandler, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const [content, setContent] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleOnSubmit = async () => {
    // await axiosInstance.post("/articles", {
    //   title: title,
    //   text: content,
    // });
    // const response = await axiosInstance.post("/summarize", {
    //   title: title,
    //   text: content,
    // });
    // const text = response.data.summary;
    // console.log("response", text);
    router.push("/summary");
  };
  return (
    <div className="px-64 pt-12 ">
      <div>
        <p></p>
        <p></p>
      </div>
      <div></div>
    </div>
  );
}
