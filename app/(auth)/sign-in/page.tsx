"use client";
import { useEffect } from "react";
import { SignedOut, SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      router.push("/articles");
    }
  }, [isLoaded, isSignedIn]);
  return (
    <div className="flex justify-center items-center h-screen">
      <SignedOut>
        <SignIn routing="hash" />
      </SignedOut>
    </div>
  );
}
