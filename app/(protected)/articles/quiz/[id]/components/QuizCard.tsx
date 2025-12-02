"use client";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Children, useEffect, useState } from "react";

export function QuizCard(props: {
  quiz: any;
  setQIndex: any;
  setCorrectCount: any;
  qIndex: any;
}) {
  const { question, options, answer } = props.quiz;
  const { setQIndex, setCorrectCount, qIndex } = props;
  const ansCheck = (ans: string) => {
    if (ans == answer) {
      console.log("true");
      setCorrectCount((prev: any) => prev + 1);
    }
  };

  //   const getQuiz = async () => {
  //     const data = await axiosInstance.get("/articles");

  //     const filteredData = data.data.filter((data) => {
  //       return data.id == id;
  //     });
  //     console.log("data", filteredData[0].quiz);
  //     setQuiz(filteredData[0].quiz);
  //   };
  //   useEffect(() => {
  //     getQuiz();
  //   }, []);
  return (
    <div>
      <div className="flex justify-between">
        <p>{question} </p>
        <p className="flex items-center gap-1">
          <span className="text-[24px] ">{qIndex + 1} </span>
          <span className="text-[#737373] ">/ 5</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 ">
        {options.length > 0 &&
          options.map((option, i) => {
            return (
              <Button
                key={i}
                className="w-full"
                variant="outline"
                onClick={() => {
                  setQIndex((prev: string) => prev + 1);
                  ansCheck(i + 1);
                }}
              >
                {option}
              </Button>
            );
          })}
      </div>
    </div>
  );
}
