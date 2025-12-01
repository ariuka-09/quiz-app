"use client";
import Image from "next/image";
import { axiosInstance } from "./lib/utils";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const employees = await axiosInstance.get("/api/employees");
      console.log("employee", employees.data);
      setEmployees(employees.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
