import "reflect-metadata";
import { Hono } from "hono";
import { serve } from "bun";
import { logger } from "hono/logger";
import loginRoute from "./routes/user/login";
import tripsRoute from "./routes/trips";

import dataSource from "./database/database";

const app = new Hono();

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

app.route("/trips", tripsRoute);
app.route("/a", loginRoute);
app.use(logger());

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on http://localhost:${port}`);
