// backend/src/index.ts
import { Hono } from "hono"
import { GoogleGenerativeAI } from "@google/generative-ai"
import * as dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.GEMINI_API_KEY as string

const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const app = new Hono()

console.log("Back-end server started")

app.get("/api/data", (c) => {
  return c.json({ message: "Hello from the back-end!" })
})

app.get("/generate", async (c) => {
  const prompt = "Hi"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(response)

  return c.text(text)
})

export default app