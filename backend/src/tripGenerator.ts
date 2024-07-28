import { GoogleGenerativeAI } from "@google/generative-ai"
import * as dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY as string

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined")
}

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

export async function generateTrip(prompt: any): Promise<string> {
  console.log("generating")

  try {
    const request = `YOU HAVE TO GENERATE TEXT WITHOUT *.   Generate me a trip to ${prompt.city} with this kind of activities: ${prompt.activities} for ${prompt.days} days for ${prompt.peopleCount} people without highlighting text. `
    const result = await model.generateContent(request)
    const response = await result.response
    const text = await response.text()
    console.log(text)
    return text
  } catch (error) {
    console.error("Error generating content:", error)
    throw error
  }
}
