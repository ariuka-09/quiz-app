"use client";
import { Button } from "@/components/ui/button";

export function QuizCard(props: {
  quiz: any;
  setQIndex: any;
  setCorrectCount: any;
  qIndex: any;
  setAttempt: any;
}) {
  const { question, options, answer, id } = props.quiz;
  const { setQIndex, setCorrectCount, qIndex, setAttempt } = props;
  const ansCheck = (ans: string) => {
    if (ans == answer) {
      console.log("true");
      setCorrectCount((prev: any) => prev + 1);
    }
  };
  return (
    <div className="">
      <div className="flex justify-between">
        <p>{question} </p>
        <p className="flex items-center gap-1">
          <span className="text-[24px] ">{qIndex + 1} </span>
          <span className="text-[#737373] ">/ 5</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 ">
        {options.length > 0 &&
          options.map((option: string, i: number) => {
            return (
              <Button
                key={i}
                className="w-full"
                variant="outline"
                onClick={() => {
                  setQIndex((prev: string) => prev + 1);
                  ansCheck(String(i));
                  setAttempt(
                    (
                      prev: {
                        givenAns: string;
                        quizId: number;
                      }[]
                    ) => {
                      return [...prev, { givenAns: i, quizId: id }];
                    }
                  );
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
