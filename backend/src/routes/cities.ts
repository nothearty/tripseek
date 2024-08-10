import { Hono } from "hono";
import cities from "cities.json";
import countries from "../countries.json";

// Define types for cities and countries
type City = {
  id: string;
  name: string;
  countryCode: string;
};

type CountryMap = {
  [code: string]: string;
};

const cityData: City[] = cities as City[];
const countryMap: CountryMap = countries as CountryMap;

// Initialize Hono route
const citiesRoute = new Hono();

// Define the /api/cities route
citiesRoute.get("api/cities", (c) => {
  const query = c.req.query("query")?.toLowerCase() || "";

  // If the query is less than 2 characters, return empty array
  if (query.length < 2) {
    return c.json([]);
  }

  // Filter cities based on the query
  const filteredCities = cityData
    .filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        (countryMap[city.countryCode]?.toLowerCase() || "").includes(query)
    )
    .slice(0, 10) // Limit the number of results
    .map((city) => ({
      id: city.id,
      city: city.name,
      countryName: countryMap[city.countryCode] || city.countryCode,
    }));

  // Return the filtered cities as JSON
  return c.json(filteredCities);
});

export default citiesRoute;
