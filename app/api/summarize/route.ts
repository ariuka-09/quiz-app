import { axiosInstance } from "@/app/lib/utils";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({});
export const POST = async (req: NextRequest) => {
  const { title, text } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `a student asks you to summarize an article under the title ${title}. You have to summarize it without losing important details or events. After that you will have to create 5 quizes with four answer choices which can be answered after reading what you have summarized. The article ${text}, return the response in array with the following structure {summary:summary, quizes:[
    quiz1:{question:question, A:answerChoice, B:answerChoice, C:answerChoice, D:answerChoice, correctAnswer:A || B || C || D },
    quiz2:{question:question, A:answerChoice, B:answerChoice, C:answerChoice, D:answerChoice, correctAnswer:A || B || C || D },
    quiz3:{question:question, A:answerChoice, B:answerChoice, C:answerChoice, D:answerChoice, correctAnswer:A || B || C || D },
    quiz4:{question:question, A:answerChoice, B:answerChoice, C:answerChoice, D:answerChoice, correctAnswer:A || B || C || D },
    quiz5:{question:question, A:answerChoice, B:answerChoice, C:answerChoice, D:answerChoice, correctAnswer:A || B || C || D }
    ]}`,
  });

  const aiText = response?.text ?? "No response";
  let cleaned = aiText.replace(/^\`\`\`json\s*|\s*\`\`\`$/g, "");

  let data = JSON.parse(cleaned);
  try {
    data = JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse AI output:", e);
    return Response.json(
      { error: "AI output is not valid JSON", raw: aiText },
      { status: 500 }
    );
  }

  const article = await axiosInstance.post("/articles", {
    title: title,
    text: text,
    summary: data.summary,
    quiz: JSON.stringify(data.quizes),
    history: title,
  });
  console.log("id", article.data.id);

  //   return Response.json({ summary: article.data.id });
  return Response.json({ summary: article.data.id });
};
