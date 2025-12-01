"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignedOut>
        <SignIn />
      </SignedOut>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}
