import { hc } from "hono/client";
import { ApiRoutes } from "@server/server";
import { queryOptions } from "@tanstack/react-query";
import { City } from "@server/database/entities/City.entity";
import { z } from "zod";

const client = hc<ApiRoutes>("/");

const postTripSchema = z.object({
  city_id: z.string(),
  days: z.number().int(),
  activities: z.array(z.string()),
  other: z.string().optional(),
});

export const clientApi = client.api;

export async function addTrip(trip: typeof postTripSchema._type) {
  try {
    const res = await client.api.trips.$post({
      json: trip,
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding trip:", error);
    return null;
  }
}

export async function getPhotos(locationName: string) {
  const res = await client.api.places.photos.$get({
    query: {
      locationName,
    },
  });
  return await res.json();
}

export const photosQueryOptions = (locationName: string) =>
  queryOptions({
    queryKey: ["photos", locationName],
    queryFn: () => getPhotos(locationName),
    staleTime: Infinity,
  });

export async function getTrips() {
  const res = await client.api.trips.$get();
  console.log("getTrips", JSON.stringify(res, null, 2));
  return await res.json();
}

export const tripsQueryOptions = queryOptions({
  queryKey: ["trips"],
  queryFn: getTrips,
  staleTime: 1000 * 60 * 5,
});

export async function getTrip(tripId: string) {
  return client.api.trips[":id"].$get({
    param: {
      id: tripId,
    },
  });
}

export const tripQueryOptions = (tripId: string) =>
  queryOptions({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
    staleTime: Infinity,
  });

export async function isLogged() {
  const res = await client.api.auth.session.$get();
  const json = await res.json();
  console.log("isLogged", json);
  return json;
}

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: isLogged,
  staleTime: 1000 * 60 * 5,
});

export async function getCity(cityName: string): Promise<City | null> {
  try {
    const res = await client.api.cities[":name"].$get({
      param: {
        name: cityName,
      },
    });
    return (await res.json()) as City;
  } catch (error) {
    return null;
  }
}
