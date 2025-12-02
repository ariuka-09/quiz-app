import { query } from "@/app/lib/connectDb";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { title } from "process";

export const GET = async () => {
  try {
    const res = await prisma.articles.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
export const POST = async (req: any) => {
  const { title, text, summary, quiz, history } = await req.json();
  try {
    const resp = await prisma.articles.create({
      data: {
        title: title,
        text: text,
        summary: summary,
        quiz: quiz,
        history: history,
      },
    });
    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json(error);
  }
};
