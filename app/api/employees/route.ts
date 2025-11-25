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
  } catch (error) {}
};
