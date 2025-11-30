"use client";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, {
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

export default function Home({ params }: { params: { id: string } }) {
  const resolvedParams: { id: string } = React.use(params); // unwrap
  const { id } = resolvedParams;
  const correctedId = Number(id) - 1;
  const stringId = String(correctedId);
  const [summary, setSummary] = useState({});
  console.log(stringId);

  useEffect(() => {
    const getSummary = async () => {
      const data = await axiosInstance.get("/articles");

      const summary = data.data.filter((article) => {
        return article.id == id;
      });

      console.log("summary", summary);

      setSummary({ summary: summary[0].summary, title: summary[0].title });
    };
    getSummary();
  }, []);
  console.log("params", id);
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
  console.log("sum", summary);

  return (
    <div className="px-64 pt-12 ">
      <div>
        <p></p>
        <p></p>
      </div>
      <div>
        <p>{summary.title} </p>
        <p>{summary.summary} </p>
      </div>
    </div>
  );
}
