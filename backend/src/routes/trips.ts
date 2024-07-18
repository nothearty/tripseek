import { Hono } from "hono";
import { post, get, put, del } from "../utils/requests";

const tripsRoute = new Hono()
  .get("/", async (c) => {
    c.json({ message: "GET /trips" });
  })
  .post("/", async (c) => {
    c.json({ message: "POST /trips" });
  })
  .put("/", async (c) => {
    c.json({ message: "PUT /trips" });
  })
  .delete("/", async (c) => {
    c.json({ message: "DELETE /trips" });
  });
