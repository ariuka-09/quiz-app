import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    try {
      const quizzes = await prisma.quiz.findMany();
      return NextResponse.json(quizzes);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    try {
      const quizzes = await prisma.quiz.findMany({
        where: {
          articleid: id,
        },
      });
      return NextResponse.json(quizzes);
    } catch (error) {
      return NextResponse.json(error);
    }
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
    return NextResponse.json(res.id);
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const PUT = async (req: NextRequest) => {
  const { attempt } = await req.json();
  console.log("attempt", attempt);
  try {
    for (let i = 0; i < attempt.length; i++) {
      const { givenAns, quizId } = attempt[i];
      console.log("givenAns", typeof givenAns, "QuizId", quizId);

      await prisma.quiz.update({
        where: { id: quizId },
        data: {
          quizattempts: {
            push: String(givenAns),
          },
        },
      });
    }
    return NextResponse.json({ message: "all quiz attempt updated" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
