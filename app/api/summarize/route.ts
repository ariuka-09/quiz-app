import { axiosInstance } from "@/app/lib/utils";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({});
export const POST = async (req: NextRequest) => {
  const { content } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Please provide a concise summary of the following article: ${content}`,
  });

  const aiText = response?.text ?? "No response";
  const cleaned = aiText.replace(/^\`\`\`json\s*|\s*\`\`\`$/g, "");

  console.log("response", cleaned);

  return Response.json({ summary: cleaned });
};
