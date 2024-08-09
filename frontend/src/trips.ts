// Definizione delle entità User, City, e Trip
interface User {
  id: number;
  name: string;
  email: string;
}

interface City {
  id: number;
  name: string;
}

export default interface Trip {
  id: number;
  user: User;
  text: string;
  departureDate: Date;
  returnDate: Date;
  cities: City[];
  created_at: Date;
  photo?: string;
}

// Crea mock users
const user1: User = { id: 1, name: "User One", email: "user1@example.com" };
const user2: User = { id: 2, name: "User Two", email: "user2@example.com" };
const user3: User = { id: 3, name: "User Three", email: "user3@example.com" };
const user4: User = { id: 4, name: "User Four", email: "user4@example.com" };
const user5: User = { id: 5, name: "User Five", email: "user5@example.com" };

// Crea mock cities
const city1: City = { id: 1, name: "City One" };
const city2: City = { id: 2, name: "City Two" };
const city3: City = { id: 3, name: "City Three" };
const city4: City = { id: 4, name: "City Four" };
const city5: City = { id: 5, name: "City Five" };
const city6: City = { id: 6, name: "City Six" };
const city7: City = { id: 7, name: "City Seven" };
const city8: City = { id: 8, name: "City Eight" };
const city9: City = { id: 9, name: "City Nine" };
const city10: City = { id: 10, name: "City Ten" };

// Crea mock trips
const trips: Trip[] = [
  {
    id: 1,
    user: user1,
    text: "Trip to City One and City Two",
    departureDate: new Date("2024-09-01T10:00:00Z"),
    returnDate: new Date("2024-09-15T18:00:00Z"),
    cities: [city1, city2],
    created_at: new Date("2024-01-01T12:00:00Z"),
    photo:
      "https://www.goodfreephotos.com/albums/united-states/new-york/new-york-city/new-york-cityscape-with-lighted-up-skyscrapers.jpg",
  },
  {
    id: 2,
    user: user2,
    text: "Trip to City Three and City Four",
    departureDate: new Date("2024-10-05T08:00:00Z"),
    returnDate: new Date("2024-10-20T20:00:00Z"),
    cities: [city3, city4],
    created_at: new Date("2024-02-01T14:00:00Z"),
    photo:
      "https://www.tripsavvy.com/thmb/xPIwthoABROewipjEM2sWZQUjJE=/3863x2577/filters:no_upscale():max_bytes(150000):strip_icc()/cityscape-of-the-los-angeles-skyline-at-dusk-los-angeles-california-united-states-of-america-north-america-530065311-57924bb33df78c17348ace09.jpg",
  },
  {
    id: 3,
    user: user3,
    text: "Trip to City Five",
    departureDate: new Date("2024-11-12T06:00:00Z"),
    returnDate: new Date("2024-11-30T22:00:00Z"),
    cities: [city5],
    created_at: new Date("2024-03-01T16:00:00Z"),
    photo:
      "https://www.goodfreephotos.com/albums/united-states/los-angeles/los-angeles-cityscape.jpg",
  },
  {
    id: 4,
    user: user4,
    text: "Trip to City Six and City Seven",
    departureDate: new Date("2024-08-01T10:00:00Z"),
    returnDate: new Date("2024-08-15T18:00:00Z"),
    cities: [city6, city7],
    created_at: new Date("2024-04-01T12:00:00Z"),
    photo:
      "https://www.wallpaperbetter.com/wallpaper/271/770/549/tokyo-japan-beautiful-city-night-skyscrapers-bay-bridge-illumination-4K-wallpaper.jpg",
  },
  {
    id: 5,
    user: user5,
    text: "Trip to City Eight",
    departureDate: new Date("2024-07-01T10:00:00Z"),
    returnDate: new Date("2024-07-15T18:00:00Z"),
    cities: [city8],
    created_at: new Date("2024-05-01T12:00:00Z"),
    photo:
      "https://p4.wallpaperbetter.com/wallpaper/362/450/454/rome-wallpaper-preview.jpg",
  },
  {
    id: 6,
    user: user1,
    text: "Trip to City Nine and City Ten",
    departureDate: new Date("2024-06-01T10:00:00Z"),
    returnDate: new Date("2024-06-15T18:00:00Z"),
    cities: [city9, city10],
    created_at: new Date("2024-06-01T12:00:00Z"),
    photo:
      "https://p4.wallpaperbetter.com/wallpaper/865/673/199/lights-cathedral-italy-night-wallpaper-preview.jpg",
  },
  {
    id: 7,
    user: user2,
    text: "Trip to City One and City Three",
    departureDate: new Date("2024-05-01T10:00:00Z"),
    returnDate: new Date("2024-05-15T18:00:00Z"),
    cities: [city1, city3],
    created_at: new Date("2024-07-01T12:00:00Z"),
    photo: "https://www.example.com/city1-city3.jpg",
  },
  {
    id: 8,
    user: user3,
    text: "Trip to City Two and City Four",
    departureDate: new Date("2024-04-01T10:00:00Z"),
    returnDate: new Date("2024-04-15T18:00:00Z"),
    cities: [city2, city4],
    created_at: new Date("2024-08-01T12:00:00Z"),
    photo: "https://www.example.com/city2-city4.jpg",
  },
  {
    id: 9,
    user: user4,
    text: "Trip to City Five and City Six",
    departureDate: new Date("2024-03-01T10:00:00Z"),
    returnDate: new Date("2024-03-15T18:00:00Z"),
    cities: [city5, city6],
    created_at: new Date("2024-09-01T12:00:00Z"),
    photo: "https://www.example.com/city5-city6.jpg",
  },
  {
    id: 10,
    user: user5,
    text: "Trip to City Seven and City Eight",
    departureDate: new Date("2024-02-01T10:00:00Z"),
    returnDate: new Date("2024-02-15T18:00:00Z"),
    cities: [city7, city8],
    created_at: new Date("2024-10-01T12:00:00Z"),
    photo: "https://www.example.com/city7-city8.jpg",
  },
  {
    id: 11,
    user: user4,
    text: "Trip to City Five and City Six",
    departureDate: new Date("2024-03-01T10:00:00Z"),
    returnDate: new Date("2024-03-15T18:00:00Z"),
    cities: [city5, city6],
    created_at: new Date("2024-09-01T12:00:00Z"),
    photo: "https://www.example.com/city5-city6.jpg",
  },
  {
    id: 12,
    user: user5,
    text: "Trip to City Seven and City Eight",
    departureDate: new Date("2024-02-01T10:00:00Z"),
    returnDate: new Date("2024-02-15T18:00:00Z"),
    cities: [city7, city8],
    created_at: new Date("2024-10-01T12:00:00Z"),
    photo: "https://www.example.com/city7-city8.jpg",
  },
];

export { trips };
