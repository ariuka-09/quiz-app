import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const quizzes = prisma.quiz.findMany();
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest) => {
  const { question, options, answer, id } = await req.json();
  console.log("check quiz", question);

  try {
    const res = await prisma.quiz.create({
      data: {
        question,
        options,
        answer,
        articleid: id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};
