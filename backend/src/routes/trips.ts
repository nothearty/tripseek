import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Trip } from "../database/entities/Trip.entity";
import { City } from "src/database/entities/City.entity";
import { User } from "../database/entities/User.entity";
import { citySchema } from "../schemas/citySchema";
import dataSource from "../database/database";
import { generateTrip } from "src/utils/tripGenerator";
import { Session } from "hono-sessions";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { authMiddleware } from "./auth";

const postTripSchema = z.object({
  city_id: z.string(),
  days: z.number().int(),
  activities: z.array(z.string()),
  other: z.string().optional(),
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

type Variables = {
  session: Session;
};

const tripsRepository = dataSource.getRepository(Trip);
const citiesRepository = dataSource.getRepository(City);
const userRepository = dataSource.getRepository(User);

const tripsRoute = new Hono<{ Variables: Variables }>()
  .use("*", authMiddleware)
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }
    try {
      const trip = await tripsRepository.findOne({
        where: { id: id },
        relations: ["cities"],
      });
      if (!trip) {
        return c.json({ error: "Trip not found" }, 404);
      }
      return c.json(trip as Trip); // Ensure it matches the Trip type
    } catch (error) {
      console.error("Error fetching trip by ID:", error);
      return c.json({ error: "Failed to fetch trip", details: error }, 500);
    }
  })
  .get("/all", async (c) => {
    try {
      const trips = await tripsRepository.find({ relations: ["cities"] });
      return c.json(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      return c.json({ error: "Failed to fetch trips", details: error }, 500);
    }
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }
    try {
      const trip = await tripsRepository.findOne({
        where: { id: id },
        relations: ["cities"],
      });
      if (!trip) {
        return c.json({ error: "Trip not found" }, 404);
      }
      return c.json(trip);
    } catch (error) {
      console.error("Error fetching trip by ID:", error);
      return c.json({ error: "Failed to fetch trip", details: error }, 500);
    }
  })
  .post("/", zValidator("json", postTripSchema), async (c) => {
    try {
      const tripData = c.req.valid("json");
      console.log("getCookie", getCookie(c, "session"));
      console.log("tripData", tripData);
      console.log("session", c.get("session").getCache());
      const user = c.get("session").get("user") as User;

      // Recupera la città
      const city = await citiesRepository.findOne({
        where: { id: parseInt(tripData.city_id) },
      });
      if (!city) {
        return c.json({ error: "City not found" }, 404);
      }

      const tripText = await generateTrip({
        city: city.name,
        days: tripData.days,
        activities: tripData.activities,
        other: tripData.other,
      });

      const tripTextEdited = tripText.replace(/\*/g, "");

      // Crea il nuovo Trip
      const newTrip = new Trip();
      newTrip.user = user;
      newTrip.text = tripTextEdited;
      newTrip.departureDate = new Date();
      newTrip.returnDate = new Date();
      newTrip.returnDate.setDate(newTrip.returnDate.getDate() + tripData.days);
      newTrip.cities = [city];

      await tripsRepository.save(newTrip);

      return c.json(newTrip, 201);
    } catch (error) {
      console.error("Error adding trip:", error);
      return c.json({ error: "Failed to add trip", details: error }, 500);
    }
  })
  .put("/:id", zValidator("json", putTripSchema), async (c) => {
    const tripId = parseInt(c.req.param("id"));
    if (isNaN(tripId)) {
      return c.json({ error: "Id not valid" });
    }
    try {
      const tripData = c.req.valid("json");
      const trip = await tripsRepository.findOne({ where: { id: tripId } });

      if (!trip) {
        return c.json({ error: "Trip not found" });
      }

      tripsRepository.merge(trip, tripData);
      await tripsRepository.save(trip);

      return c.json(trip);
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
    try {
      const trip = await tripsRepository.findOne({ where: { id: id } });
      if (!trip) {
        return c.json({ error: "Trip not found" }, 404);
      }
      await tripsRepository.remove(trip);
      return c.json({ message: "Trip deleted" });
    } catch (error) {
      console.error("Error deleting trip:", error);
      return c.json({ error: "Failed to delete trip", details: error }, 500);
    }
  });

export default tripsRoute;
