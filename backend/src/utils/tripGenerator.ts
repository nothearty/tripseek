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
    const request = `Generate me a trip itinerary to ${prompt.city} for ${
      prompt.days
    }. Describe the city a little bit, and provide me a little story of the city and include this activities: ${
      prompt.activities
    } in my itinerary ${
      prompt.other ? `including these other infos ${prompt.other}` : null
    }. Provide me places name (at least 3 places per day) to visit and little description of one.
    Generate me a JSON in this format and this types. Use ' in the string, instead of ".
     {
      city: string;
      daysNumber: number; // Total number of days in the trip
      description: string; // City description
      history: string;
      itinerary: {
        day: string;
        parts: {
          activities: {
            placeName: string; // The name of the place to visit
            placeDescription: string; // Description of the place to visit
          }[];
        }[];
      }[];
    };`;
    const result = await model.generateContent(request);
    const response = await result.response;
    const text = await response.text();
    //console.log(text);
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
