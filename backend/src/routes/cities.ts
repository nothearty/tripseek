import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { City } from "src/database/entities/City.entity";
import dataSource from "../database/database";
import { z } from "zod";

const postCitySchema = z.object({
  name: z.string(),
  province: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

const citiesRepository = dataSource.getRepository(City);

const citiesRoute = new Hono()
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }
    let city = await citiesRepository.findOne({
      where: { id: id },
    });
    if (!city) {
      return c.json({ error: "City not found" });
    }
    return c.json(city);
  })
  .post("/", zValidator("json", postCitySchema), async (c) => {
    const cityData = c.req.valid("json");
    await citiesRepository.save(cityData);

    return c.json({ message: "POST /trips" });
  })
  .delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Id not valid" });
    }

    let city = await citiesRepository.findOne({
      where: { id: id },
    });
    if (!city) {
      return c.json({ error: "City not found" });
    }
    await citiesRepository.remove(city);
    return c.json({ message: "City deleted" });
  });

export default citiesRoute;
