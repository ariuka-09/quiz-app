import { query } from "@/app/lib/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM employees");
    console.log("working");
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(error);
  }
};

export const POST = async () => {
  try {
    await query(
      `INSERT INTO employees (firstname, lastname, age, gender, departmentid, position, hiredate) VALUES ($1, $2, $3, $4, $5, $6, $7) `,
      ["im good person", "test2", "3", "Male", "1", "tester", "2000-01-01"]
    );
    console.log("working");
    return NextResponse.json("working");
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(error);
  }
};
