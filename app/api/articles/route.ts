import { query } from "@/app/lib/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM articles");
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
};
