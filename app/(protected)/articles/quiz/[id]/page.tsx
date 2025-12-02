"use client";
import { axiosInstance } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuizCard } from "./components/QuizCard";
import { quiz } from "@/app/lib/type";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  const [quizes, setQuizes] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempt, setAttempt] = useState([]);
  const router = useRouter();

  const quizSubmitHandle = async () => {
    await axiosInstance.patch("/quizCrud", { attempt });
  };
  useEffect(() => {
    if (qIndex == 5) {
      router.push(`/articles/result/${id}`);
      quizSubmitHandle();
    }
  }, [qIndex]);

  const getQuizes = async () => {
    const data = await axiosInstance.get("/quizCrud");
    const filteredData = data.data.filter((quiz: quiz) => {
      return quiz.articleid == id;
    });
    console.log("data", filteredData);
    setQuizes(filteredData || "[]");
  };

  useEffect(() => {
    getQuizes();
    console.log("correctCount", correctCount);
  }, []);

  return (
    <div className="mx-64 mt-26 flex flex-col gap-5 border-b border w-fit p-7 rounded-lg ">
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
            Quick test
          </p>
          <p className="text-[14px] font-semibold text-[#737373] flex items-center gap-2 ">
            Take a quick test about your knowledge from your content
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full">
        {quizes.length > 0 && qIndex != 5 && (
          <QuizCard
            quiz={quizes[qIndex]}
            setQIndex={setQIndex}
            setCorrectCount={setCorrectCount}
            qIndex={qIndex}
            setAttempt={setAttempt}
          />
        )}
      </div>
    </div>
  );
}
