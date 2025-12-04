import prisma from "@/app/lib/prisma";
import { axiosInstance } from "@/app/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = await auth();
  try {
    const res = await prisma.article.findMany({
      where: {
        userid: userId,
      },
    });
    console.log("filtered history", res);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest) => {
  //   const { isLoaded, isSignedIn, userId } = useAuth();
  const { userId } = await auth();
  const { title, content } = await req.json();
  console.log(content);
  const res = await axiosInstance.post("/summarize", { content: content });
  console.log("summary", res.data.summary);

  try {
    const resp = await prisma.article.create({
      data: {
        title: title,
        content: content,
        summary: res.data.summary,
        userid: userId,
      },
    });
    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json(error);
  }
};
