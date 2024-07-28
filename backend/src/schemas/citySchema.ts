import { z } from "@hono/zod-openapi";

export const citySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  province: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

export const postCitySchema = z.object({
  name: z.string(),
  province: z.string(),
  country: z.string(),
  postalCode: z.string(),
});
