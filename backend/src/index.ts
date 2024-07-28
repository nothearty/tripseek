import { Hono } from "hono"
import { generateTrip } from "./tripGenerator"

const app = new Hono()

app.get("/generate", async (c) => {
  const city = c.req.query("city")
  const dates = c.req.query("dates")
  const activities = c.req.query("activities")
  const peopleCount = c.req.query("peopleCount")

  if (!activities) {
    return c.json({ error: "Activities are required" }, 400)
  }

  const prompt = {
    city,
    dates,
    activities,
    peopleCount,
  }

  try {
    const response = await generateTrip(prompt)
    return c.json({ response })
  } catch (error) {
    return c.json({ error: "Failed to generate trip" }, 500)
  }
})

export default app
