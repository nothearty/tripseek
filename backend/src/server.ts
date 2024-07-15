import { serve } from "bun";
import app from "./index";

const port = parseInt(process.env.PORT || "3000", 10);

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on http://localhost:${port}`);
