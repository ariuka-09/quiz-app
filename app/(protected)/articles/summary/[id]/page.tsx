"use client";

import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import React, { use, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Sparkles, BookOpen } from "lucide-react";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [summary, setSummary] = useState({
    summary: "",
    title: "",
  });

  // 1. Initialize loading as true so we start with the skeleton
  const [loading, setLoading] = useState(true);
  const [quizLoading, setQuizLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSummary = async () => {
      try {
        const data = await axiosInstance.get("/article");
        const filtered = data.data.find((article: any) => article.id == id);

        if (filtered) {
          setSummary({ summary: filtered.summary, title: filtered.title });
        }
      } catch (error) {
        console.error("Failed to fetch summary", error);
      } finally {
        setLoading(false);
      }
    };
    getSummary();
  }, [id]);

  const handleTakeQuiz = async () => {
    setQuizLoading(true);
    try {
      const response = await axiosInstance.post("/quiz", {
        content: summary.summary,
      });

      const quizzes = response.data.quizzes;

      // Using Promise.all is faster than a for-loop for multiple API calls
      await Promise.all(
        quizzes.map((quiz: any) =>
          axiosInstance.post("/quizCrud", {
            question: quiz.question,
            options: quiz.options,
            answer: quiz.answer,
            id: id,
          })
        )
      );

      router.push(`/articles/quiz/${id}`);
    } catch (error) {
      console.error("Quiz generation failed", error);
    } finally {
      setQuizLoading(false);
    }
  };

  // 2. Entire Page Skeleton State
  if (loading) {
    return (
      <div className="mx-[10%] flex flex-col gap-6 border w-[600px] p-7 rounded-xl bg-white shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-7 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-3 py-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-slate-50">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    );
  }

  // 3. Actual Content State
  return (
    <div className="mx-[10%] flex flex-col gap-5 border w-fit max-w-[700px] p-7 rounded-xl bg-white shadow-sm transition-all duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="flex text-2xl font-bold gap-2 text-slate-900 items-center">
            <Sparkles className="w-8 h-8 text-[#fabd32]" />
            Article Quiz Generator
          </p>
          <p className="text-sm font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Summarized content
          </p>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            {summary.title}
          </h1>
          <p className="text-[15px] font-medium text-slate-600 leading-relaxed italic border-l-4 border-[#fabd32]/20 pl-4">
            {summary.summary}
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center mt-4 pt-6 border-t border-slate-100">
        {!quizLoading ? (
          <Button
            onClick={handleTakeQuiz}
            className="bg-slate-900 hover:bg-[#fabd32] hover:text-black font-bold px-8 transition-all"
          >
            Take a quiz
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-blue-600 font-bold px-4">
            <ClipLoader color="#1d4ed8" size={24} />
            <span className="text-sm">Preparing Quiz...</span>
          </div>
        )}
      </div>
    </div>
  );
}
