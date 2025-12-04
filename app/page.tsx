"use client";
import Image from "next/image";
import { axiosInstance } from "./lib/utils";
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
import { useRouter } from "next/navigation";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  router.push("/sign-in");
  // const getEmployees = async () => {
  //   try {
  //     const employees = await axiosInstance.get("/api/employees");
  //     console.log("employee", employees.data);
  //     setEmployees(employees.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   getEmployees();
  // }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <SignedOut>
        <SignIn />
        <SignUp />
      </SignedOut>
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}
