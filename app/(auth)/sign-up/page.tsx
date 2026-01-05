"use client";
import { SignedOut } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignedOut>
        <SignUp />
      </SignedOut>
    </div>
  );
}
