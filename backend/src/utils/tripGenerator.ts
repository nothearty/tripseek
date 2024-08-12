import { GoogleGenerativeAI } from "@google/generative-ai";
import { TripInput } from "../sharedTypes";

const apiKey = process.env.GEMINI_API_KEY as string;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateTrip(prompt: TripInput): Promise<string> {
  console.log("generating");

  try {
    const request = `Generate me a trip itinerary to ${prompt.city} for ${prompt.days} days. Describe the city a little bit and include this activities ${prompt.activities} in my itinerary including these other infos: ${prompt.other}. Do NOT include any cuisine or transport advices. Do NOT make any tittle for this itinerary. Do NOT use markdown styling`;
    const result = await model.generateContent(request);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
