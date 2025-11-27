import { query } from "@/app/lib/connectDb";
import { NextResponse } from "next/server";
import { title } from "process";

export const GET = async () => {
  try {
    const res = await query("SELECT * FROM articles");
    return NextResponse.json(res.rows);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
};
export const POST = async (req: any) => {
  const { title, text } = req;
  try {
    const res = await query(`INSERT INTO article(title, text) VALUES($1, $2)`, [
      title,
      text,
    ]);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
