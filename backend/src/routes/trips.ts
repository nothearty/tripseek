import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Trip } from "../database/entities/Trip.entity";
import { citySchema } from "../schemas/citySchema";
import dataSource from "../database/database";

const postTripSchema = z.object({
  user_id: z.number().int(),
  text: z.string(),
  returnDate: z.string().transform((str) => new Date(str)),
  departureDate: z.string().transform((str) => new Date(str)),
  cities: z.array(citySchema).min(1),
});

const putTripSchema = z.object({
  returnDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  departureDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
});

const tripsRepository = dataSource.getRepository(Trip);

const tripsRoute = new Hono()
  .get("/", async (c) => {
    try {
      console.log("GET /trips");
      const trips = await tripsRepository.find({ relations: ["cities"] });
      console.log("Trips:", trips);
      return c.json(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      return c.json({ error: "Failed to fetch trips", details: error }, 500);
    }
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log("GET /trips/:id", id);
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }
    let trip = await tripsRepository.findOne({
      where: { id: id },
      relations: ["cities"],
    });
    console.log("Albicocca:", trip);
    if (!trip) {
      return c.json({ error: "Trip not found" });
    }
    console.log("Trip:", trip);
    return await c.json(trip);
  })
  .post("/", zValidator("json", postTripSchema), async (c) => {
    try {
      const tripData = c.req.valid("json");
      console.log("Validated Trip Data:", tripData);

      const newTrip = tripsRepository.create(tripData);
      await tripsRepository.save(newTrip);

      return c.json({ message: "Trip added to the database", newTrip }, 201);
    } catch (error) {
      console.error("Error adding trip:", error);
      return c.json({ error: "Failed to add trip", details: error }, 500);
    }
  })
  .put("/:id", zValidator("json", putTripSchema), async (c) => {
    console.log("PUT /trips");
    try {
      const tripId = parseInt(c.req.param("id"));
      if (isNaN(tripId)) {
        return c.json({ error: "Id not valid" });
      }

      const tripData = c.req.valid("json");
      const trip = await tripsRepository.findOne({
        where: { id: tripId },
      });

      if (!trip) {
        return c.json({ error: "Trip not found" });
      }

      tripsRepository.merge(trip, tripData);
      await tripsRepository.save(trip);

      return c.json({ message: "Trip updated successfully", trip });
    } catch (error) {
      console.error("Error updating trip:", error);
      return c.json({ error: "Failed to update trip", details: error }, 500);
    }
  })
  .delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }

    let city = await tripsRepository.findOne({
      where: { id: id },
    });
    if (!city) {
      return c.json({ error: "City not found" });
    }
    await tripsRepository.remove(city);
    return c.json({ message: "City deleted" });
  });

export default tripsRoute;
