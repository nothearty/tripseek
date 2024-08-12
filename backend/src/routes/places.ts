import { Hono } from "hono";
import { fetchPlacePhotos } from "../utils/places";

const placesRoute = new Hono().get("/photos", async (c) => {
  const locationName = c.req.query("locationName");
  if (!locationName) {
    return c.json({ error: "locationName query parameter is required" }, 400);
  }

  try {
    const photoUrls = await fetchPlacePhotos(locationName);
    if (photoUrls) {
      return c.json({ photos: photoUrls });
    } else {
      return c.json({ error: "No photos found for the location" }, 404);
    }
  } catch (error) {
    return c.json({ error: "Failed to fetch photos" }, 500);
  }
});

export default placesRoute;
