"use client";
import { axiosInstance } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import {
  ChangeEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isLoaded, isSignedIn, userId } = useAuth();
  useEffect(() => {
    console.log("user", userId);

    if (!isSignedIn && isLoaded) {
      router.push("/sign-in");
    }
  }, [isLoaded]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleOnSubmit = async () => {
    const response = await axiosInstance.post("/article", {
      title: title,
      content: content,
    });
    const id = response.data.id;
    console.log("should be response", response);

    router.push(`/articles/summary/${id}`);
  };
  return (
    <div className="mx-64 mt-26 flex flex-col gap-5 border border-b rounded-lg p-7">
      {/* <div className="flex flex-col gap-5">
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
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </p>
      </div>

      <div className="gap-2">
        <p className="flex gap-1 items-center text-[#71717A] font-semibold text-[14px] ">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08594 1C9.48371 1.00004 9.86522 1.15818 10.1465 1.43945L12.5605 3.85352L12.6602 3.96387C12.8788 4.23073 13 4.56606 13 4.91406V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5C2 1.67157 2.67157 1 3.5 1H9.08594ZM3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.91406C12 4.81464 11.9704 4.71823 11.916 4.63672L11.8535 4.56055L9.43945 2.14648C9.34572 2.05275 9.21849 2.00004 9.08594 2H3.5ZM10.5 10C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H4.5C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H10.5ZM10.5 7C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H10.5ZM7.5 4C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5C4.22386 5 4 4.77614 4 4.5C4 4.22386 4.22386 4 4.5 4H7.5Z"
              fill="black"
            />
          </svg>
          Article Title
        </p>
        <Textarea />
      </div>
      <div className="flex flex-col gap-5  ">
        <p className="flex gap-1 items-center text-[#71717A] font-semibold text-[14px] ">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08594 1C9.48371 1.00004 9.86522 1.15818 10.1465 1.43945L12.5605 3.85352L12.6602 3.96387C12.8788 4.23073 13 4.56606 13 4.91406V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5C2 1.67157 2.67157 1 3.5 1H9.08594ZM3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V4.91406C12 4.81464 11.9704 4.71823 11.916 4.63672L11.8535 4.56055L9.43945 2.14648C9.34572 2.05275 9.21849 2.00004 9.08594 2H3.5ZM10.5 10C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H4.5C4.22386 11 4 10.7761 4 10.5C4 10.2239 4.22386 10 4.5 10H10.5ZM10.5 7C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7H10.5ZM7.5 4C7.77614 4 8 4.22386 8 4.5C8 4.77614 7.77614 5 7.5 5H4.5C4.22386 5 4 4.77614 4 4.5C4 4.22386 4.22386 4 4.5 4H7.5Z"
              fill="black"
            />
          </svg>
          Article Content
        </p>
        <Textarea />
        <div className="flex justify-end">
          <div>
            <Button variant="destructive">Loading </Button>
          </div>
        </div>
      </div> */}
      <div>loading</div>
    </div>
  );
}
