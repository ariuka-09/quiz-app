"use client";
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
        <SignUp />
      </SignedOut>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}
