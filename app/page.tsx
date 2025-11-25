"use client";
import Image from "next/image";
import { axiosInstance } from "./lib/utils";
import { useEffect, useState } from "react";

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
      {employees.map((e, i) => {
        return (
          <div key={i}>
            <div>{e.firstname}</div>
            <div>{e.lastname}</div>
            <div>{e.age}</div>
          </div>
        );
      })}
    </div>
  );
}
