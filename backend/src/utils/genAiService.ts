import { GoogleGenerativeAI } from "@google/generative-ai";

async function apiGemini({ prompt }: { prompt: string }) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("API_KEY is not defined");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([prompt]);

  return result;
}
export { apiGemini };
