import "reflect-metadata";
import { serve } from "bun";
import { logger } from "hono/logger";

import app from "./index";
import dataSource from "./database/database";

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

app.use(logger());

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on http://localhost:${port}`);
