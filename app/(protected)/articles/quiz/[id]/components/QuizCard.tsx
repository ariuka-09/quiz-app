import { axiosInstance } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export function QuizCard({ quiz }: any) {
  const { question, A, B, C, D, correctAnswer } = quiz;
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
      <div>
        <p>{question} </p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 ">
        <div>{A}</div>
        <div>{B}</div>
        <div>{C}</div>
        <div>{D}</div>
      </div>
    </div>
  );
}
