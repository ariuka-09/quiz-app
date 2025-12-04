"use client";
import { quiz } from "@/app/lib/type";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [results, setResults] = useState<quiz[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const getResults = async () => {
    const results = await axiosInstance.get("/quizCrud", {
      params: { id },
    });
    console.log("results", results.data);
    setResults(results.data ?? []);
    let correct = 0;
    for (let i = 0; i < results.data.length; i++) {
      if (
        results.data[i].quizattempts[results.data[i].quizattempts.length - 1] ==
        results.data[i].answer
      ) {
        correct++;
      }
    }
    setCorrectCount(correct);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getResults();
  }, []);
  return (
    <div className="mx-[10%] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-2xl flex items-center gap-2">
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
          Quiz completed
        </p>
        <p className="text-[#71717A] font-medium ">Let’s see what you did</p>
      </div>
      {!loading ? (
        <div className="flex flex-col gap-7 border border-b rounded-2xl p-7">
          <div className="flex items-center gap-1">
            <p className="text-2xl font-semibold">
              Your score: {correctCount}{" "}
            </p>
            <p className="text-[#71717A]">/ 5</p>
          </div>
          <div className="flex flex-col gap-7 ">
            <div className="flex flex-col gap-3">
              {results.map((result, i: number) => {
                return (
                  <div className="flex gap-3" key={i}>
                    <div>
                      {result.quizattempts[result.quizattempts.length - 1] ==
                      result.answer ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 12C1 5.92472 5.92472 1 12 1C18.0753 1 23 5.92472 23 12C23 18.0753 18.0753 23 12 23C5.92472 23 1 18.0753 1 12ZM12 3C7.02928 3 3 7.02928 3 12C3 16.9707 7.02928 21 12 21C16.9707 21 21 16.9707 21 12C21 7.02928 16.9707 3 12 3Z"
                            fill="#22C55E"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L11.7071 14.7071C11.3166 15.0976 10.6834 15.0976 10.2929 14.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
                            fill="#22C55E"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
                            fill="#B91C1C"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289Z"
                            fill="#B91C1C"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z"
                            fill="#B91C1C"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[#737373] text-xs ">
                        {i + 1}. {result.question}
                      </div>
                      <div className=" text-xs">
                        Your answer:{" "}
                        {
                          result.options[
                            Number(
                              result.quizattempts[
                                result.quizattempts.length - 1
                              ]
                            )
                          ]
                        }
                      </div>
                      {result.quizattempts[result.quizattempts.length - 1] !==
                        result.answer && (
                        <div className="text-green-500  text-xs">
                          Correct:{result.options[Number(result.answer)]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-around">
              <Button
                variant="outline"
                onClick={() => {
                  router.push(`/articles/quiz/${id}`);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1.40662C11.0986 1.40681 12.7068 3.56929 13.4316 4.84705L14.0283 5.89978H11.1992C11.181 5.89957 11.166 5.88483 11.166 5.86658C11.166 5.84836 11.181 5.83358 11.1992 5.83337H13.8867L13.4932 5.09705C12.8509 3.89688 11.2581 1.47323 8 1.47302C4.02006 1.47302 1.47266 4.73535 1.47266 8.00037C1.47287 11.2653 4.02023 14.5267 8 14.5267C9.91506 14.5266 11.4973 13.7718 12.624 12.6254C13.2294 12.0095 13.704 11.2803 14.0273 10.4945C14.0344 10.4776 14.0533 10.4691 14.0703 10.476C14.0873 10.4829 14.0959 10.5029 14.0889 10.5199C13.7623 11.3135 13.2834 12.05 12.6719 12.6722C11.5331 13.8308 9.9337 14.593 8 14.5931C3.97859 14.5931 1.40646 11.2971 1.40625 8.00037C1.40625 4.70354 3.97842 1.40662 8 1.40662ZM14.3994 2.63318C14.4177 2.63318 14.4325 2.64812 14.4326 2.66638V5.86658C14.4326 5.88496 14.4178 5.89978 14.3994 5.89978H14.3662V2.66638C14.3664 2.64818 14.3812 2.63328 14.3994 2.63318Z"
                    fill="#09090B"
                    stroke="#18181B"
                  />
                </svg>
                Restart quiz
              </Button>
              <Button
                onClick={() => {
                  router.push(`/articles`);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6663 14L7.99967 11.3333L3.33301 14V3.33333C3.33301 2.97971 3.47348 2.64057 3.72353 2.39052C3.97358 2.14048 4.31272 2 4.66634 2H11.333C11.6866 2 12.0258 2.14048 12.2758 2.39052C12.5259 2.64057 12.6663 2.97971 12.6663 3.33333V14Z"
                    stroke="#FAFAFA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Save and leave
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-7 border border-b rounded-2xl p-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-70 h-6" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-140 h-14" />
              <Skeleton className="w-140 h-14" />
              <Skeleton className="w-140 h-14" />
              <Skeleton className="w-140 h-14" />
            </div>
          </div>
          <div className="flex justify-around">
            <Button variant="outline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1.40662C11.0986 1.40681 12.7068 3.56929 13.4316 4.84705L14.0283 5.89978H11.1992C11.181 5.89957 11.166 5.88483 11.166 5.86658C11.166 5.84836 11.181 5.83358 11.1992 5.83337H13.8867L13.4932 5.09705C12.8509 3.89688 11.2581 1.47323 8 1.47302C4.02006 1.47302 1.47266 4.73535 1.47266 8.00037C1.47287 11.2653 4.02023 14.5267 8 14.5267C9.91506 14.5266 11.4973 13.7718 12.624 12.6254C13.2294 12.0095 13.704 11.2803 14.0273 10.4945C14.0344 10.4776 14.0533 10.4691 14.0703 10.476C14.0873 10.4829 14.0959 10.5029 14.0889 10.5199C13.7623 11.3135 13.2834 12.05 12.6719 12.6722C11.5331 13.8308 9.9337 14.593 8 14.5931C3.97859 14.5931 1.40646 11.2971 1.40625 8.00037C1.40625 4.70354 3.97842 1.40662 8 1.40662ZM14.3994 2.63318C14.4177 2.63318 14.4325 2.64812 14.4326 2.66638V5.86658C14.4326 5.88496 14.4178 5.89978 14.3994 5.89978H14.3662V2.66638C14.3664 2.64818 14.3812 2.63328 14.3994 2.63318Z"
                  fill="#09090B"
                  stroke="#18181B"
                />
              </svg>
              Restart quiz
            </Button>
            <Button>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6663 14L7.99967 11.3333L3.33301 14V3.33333C3.33301 2.97971 3.47348 2.64057 3.72353 2.39052C3.97358 2.14048 4.31272 2 4.66634 2H11.333C11.6866 2 12.0258 2.14048 12.2758 2.39052C12.5259 2.64057 12.6663 2.97971 12.6663 3.33333V14Z"
                  stroke="#FAFAFA"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Save and leave
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
