import { Hono } from "hono";
import { post, get, put, del } from "../utils/requests";
import { Trip } from "../database/entities/Trip.entity";
import { City } from "../database/entities/City.entity";
import { z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "src/schemas/citySchema";

const tripsRepository = Trip.getRepository();

const postTripSchema = z.object({
  user_id: z.number().int(),
  text: z.string(),
  returnDate: z.date(),
  departureDate: z.date(),
  cities: z.array(citySchema).min(1),
});

const tripsRoute = new Hono()
  .get("/", async (c) => {
    c.json({ message: "GET /trips" });
  })
  .post("/", zValidator("json", postTripSchema), async (c) => {
    const tripData = c.req.valid("json");
    const newTrip = tripsRepository.create(tripData);
    await tripsRepository.save(newTrip);
    c.json({ message: "Trip added to the database" });
  })
  .put("/", async (c) => {
    c.json({ message: "PUT /trips" });
  })
  .delete("/", async (c) => {
    c.json({ message: "DELETE /trips" });
  });
