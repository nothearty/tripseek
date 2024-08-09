export const DUMMY_ITEMS = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
  { label: "Four", value: "4" },
  { label: "Five", value: "5" },
  { label: "Six", value: "6" },
] satisfies { label: string; value: string }[]

export const CITIES = [
  { id: "city-1", city: "Albuquerque", country: "United States" },
  {
    id: "city-2",
    city: "San Francisco",
    country: "United States",
  },
  { id: "city-3", city: "Los Angeles", country: "United States" },
  { id: "city-4", city: "New York", country: "United States" },
  { id: "city-5", city: "Rome", country: "Italy" },
  { id: "city-6", city: "Milan", country: "Italy" },
  { id: "city-7", city: "Kyiv", country: "Ukraine" },
  {
    id: "city-8",
    city: "Lviv",
    country: "Ukraine",
  },
  { id: "city-9", city: "Sofia", country: "Bulgary" },
  {
    id: "city-10",
    city: "Tokyo",
    country: "Japan",
  },
] satisfies { id: string; city: string; country: string }[]
