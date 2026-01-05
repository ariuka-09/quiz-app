import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({});
export const POST = async (req: NextRequest) => {
  const { content } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate 5 multiple choice questions based on this article: ${content}, keep the answers short. Return the response in this exact JSON format:
      [
        {
          "question": "Question text here",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "0"
        }
      ]
      Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`,
  });

  const aiText = response?.text ?? "No response";
  console.log("quiz before cleaning", aiText);

  const cleaned = aiText.replace(/^\`\`\`json\s*|\s*\`\`\`$/g, "");
  const arr = JSON.parse(cleaned);

  //   console.log("response", cleaned);

  return Response.json({ quizzes: arr });
};
