// import "reflect-metadata";
import { Hono } from "hono";
import { serve } from "bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
// import { getPhotos } from "./utils/places";

import loginRoute from "./routes/user/login";
import tripsRoute from "./routes/trips";
import citiesRoute from "./routes/cities";
import placesRoute from "./routes/places";
import dataSource from "./database/database";

const app = new Hono();

app.use(cors());
// app.use(logger());

const routes = app
  .basePath("/api")
  .route("/trips", tripsRoute)
  .route("/auth", loginRoute)
  .route("/cities", citiesRoute)
  .route("/places", placesRoute);

dataSource
  .initialize()
  .then(() => {
    console.log("DataSource Sucessfully Connected With The Database!!!");
    console.log(dataSource.options.entities);
  })
  .catch((err) => {
    console.log("DataSource Connection Failed", err);
  });

const port = parseInt(process.env.PORT || "3000", 10);

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on http://localhost:${port}`);

export default app;
export type ApiRoutes = typeof routes;
