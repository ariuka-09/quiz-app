"use client";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, {
  ChangeEventHandler,
  ReactEventHandler,
  use,
  useEffect,
  useState,
} from "react";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [summary, setSummary] = useState({
    summary: "",
    title: "",
  });
  const router = useRouter();

  useEffect(() => {
    // window.location.reload();
    const getSummary = async () => {
      const data = await axiosInstance.get("/article");
      const summary = data.data.filter((article: any) => {
        return article.id == id;
      });

      setSummary({ summary: summary[0].summary, title: summary[0].title });
    };
    getSummary();
  }, []);

  const handleTakeQuiz = async () => {
    const response = await axiosInstance.post("/quiz", {
      content: summary.summary,
    });

    const quizzes = await response.data.quizzes;
    console.log("checking quizzes", quizzes[0]);
    console.log("checking response", response);
    for (let i = 0; i < quizzes.length; i++) {
      console.log("test", quizzes[i]);

      const quizId = await axiosInstance.post("/quizCrud", {
        question: quizzes[i].question,
        options: quizzes[i].options,
        answer: quizzes[i].answer,
        id: id,
      });
      console.log("id", quizId);
    }

    router.push(`/articles/quiz/${id}`);
  };
  return (
    <div className="mx-64 mt-12 flex flex-col gap-5 border-b border w-fit p-7 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-5">
          <p className="flex text-[24px] font-semibold gap-2">
            {" "}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 4V9.33333M25.3333 22.6667V28M4 6.66667H9.33333M22.6667 25.3333H28M16 4L13.4507 11.7507C13.3202 12.1473 13.0984 12.5078 12.8031 12.8031C12.5078 13.0984 12.1473 13.3202 11.7507 13.4507L4 16L11.7507 18.5493C12.1473 18.6798 12.5078 18.9016 12.8031 19.1969C13.0984 19.4922 13.3202 19.8527 13.4507 20.2493L16 28L18.5493 20.2493C18.6798 19.8527 18.9016 19.4922 19.1969 19.1969C19.4922 18.9016 19.8527 18.6798 20.2493 18.5493L28 16L20.2493 13.4507C19.8527 13.3202 19.4922 13.0984 19.1969 12.8031C18.9016 12.5078 18.6798 12.1473 18.5493 11.7507L16 4Z"
                stroke="#09090B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Article Quiz Generator
          </p>
          <p className="text-[14px] font-semibold text-[#737373] flex items-center gap-2 ">
            <svg
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16667 3.16667C7.16667 2.45942 6.88571 1.78115 6.38562 1.28105C5.88552 0.780951 5.20724 0.5 4.5 0.5H0.5V10.5H5.16667C5.6971 10.5 6.20581 10.7107 6.58088 11.0858C6.95595 11.4609 7.16667 11.9696 7.16667 12.5M7.16667 3.16667V12.5M7.16667 3.16667C7.16667 2.45942 7.44762 1.78115 7.94771 1.28105C8.44781 0.780951 9.12609 0.5 9.83333 0.5H13.8333V10.5H9.16667C8.63623 10.5 8.12753 10.7107 7.75245 11.0858C7.37738 11.4609 7.16667 11.9696 7.16667 12.5"
                stroke="#09090B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Summarized content
          </p>
        </div>
        <div>
          <p className="text-[24px] font-semibold">{summary.title} </p>
          <p className="text-[14px] font-normal">{summary.summary} </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline">See content</Button>
        <Button onClick={handleTakeQuiz}>Take a quiz</Button>
      </div>
    </div>
  );
}
