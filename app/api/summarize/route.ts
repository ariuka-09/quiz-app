import { axiosInstance } from "@/app/lib/utils";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({});
export const POST = async (req: NextRequest) => {
  const { title, text } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `imagine you are an english language center named Winner's Course from mongolia with 150k+ followers on facebook. A student asks ${text}, your tuition fee is 379k mnt, and students have classes 5 days a week for hour and a half. In addition, students are offered two 30 min coaching one-on-one study sessions with a teacher of their choice every week, and 5-8 speaking clubs everyweek, and your task is to answer this question based on their previous facebook posts, keep it short, as if you are responding to a text message`,
  });

  const aiText = response?.text ?? "No response";
  //   let cleaned = aiText.replace(/^\`\`\`json\s*|\s*\`\`\`$/g, "");

  //   let data = JSON.parse(cleaned);
  //   try {
  //     data = JSON.parse(cleaned);
  //   } catch (e) {
  //     console.error("Failed to parse AI output:", e);
  //     return Response.json(
  //       { error: "AI output is not valid JSON", raw: aiText },
  //       { status: 500 }
  //     );
  //   }

  const article = await axiosInstance.post("/articles", {
    title: title,
    text: text,
    summary: data.summary,
    quiz: JSON.stringify(data.quizes),
    history: title,
  });
  console.log("id", article.data.id);

  //   return Response.json({ summary: article.data.id });
  return Response.json({ summary: aiText });
};
