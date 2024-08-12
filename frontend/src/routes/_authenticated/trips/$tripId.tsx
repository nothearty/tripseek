import Trip from "@/components/Trip";
import { createFileRoute } from "@tanstack/react-router";

type TripProps = {
  city: string;
  daysNumber: number; // Total number of days in the trip
  description: string; // City description
  history: string;
  itinerary: {
    day: string;
    parts: {
      activities: {
        placeName: string; // The name of the place to visit
        placeDescription: string; // Description of the place to visit
      }[];
    }[];
  }[];
};

const itinerary: TripProps = {
  city: "Tbilisi",
  daysNumber: 4,
  description:
    "Tbilisi, the capital of Georgia, is a captivating city where ancient history meets modern vibrancy. Its unique blend of European and Asian influences creates a fascinating atmosphere.",
  history:
    "Founded in the 5th century, Tbilisi has witnessed the rise and fall of various empires, leaving behind a rich tapestry of cultures and architectural styles. The city's name translates to 'warm springs,' reflecting its natural hot springs that have been cherished for centuries.",
  itinerary: [
    {
      day: "Day 1",
      parts: [
        {
          activities: [
            {
              placeName: "Narikala Fortress",
              placeDescription:
                "A historic fortress offering panoramic views of the city and the Kura River.",
            },
            {
              placeName: "Metekhi Church",
              placeDescription:
                "A charming church perched on a cliff overlooking the Kura River, with stunning views and a rich history.",
            },
            {
              placeName: "Botanic Garden",
              placeDescription:
                "A peaceful oasis with diverse flora, perfect for a relaxing stroll and enjoying nature.",
            },
          ],
        },
      ],
    },
    {
      day: "Day 2",
      parts: [
        {
          activities: [
            {
              placeName: "Old Town",
              placeDescription:
                "A labyrinth of narrow streets lined with colorful houses, traditional shops, and cozy cafes.",
            },
            {
              placeName: "Sulfur Baths",
              placeDescription:
                "Experience Tbilisi's traditional bathing culture in one of the historic sulfur baths.",
            },
            {
              placeName: "Freedom Square",
              placeDescription:
                "A bustling public square surrounded by government buildings and monuments.",
            },
          ],
        },
      ],
    },
    {
      day: "Day 3",
      parts: [
        {
          activities: [
            {
              placeName: "National Museum of Georgia",
              placeDescription:
                "Explore the rich history and culture of Georgia through extensive exhibits.",
            },
            {
              placeName: "Sioni Cathedral",
              placeDescription:
                "A magnificent cathedral with a long history, featuring impressive architecture and religious artifacts.",
            },
            {
              placeName: "Mtatsminda Park",
              placeDescription:
                "Enjoy panoramic views of Tbilisi from the top of the mountain, accessible by funicular or cable car.",
            },
          ],
        },
      ],
    },
    {
      day: "Day 4",
      parts: [
        {
          activities: [
            {
              placeName: "Rike Park",
              placeDescription:
                "A modern park on the banks of the Kura River, offering beautiful views and various recreational activities.",
            },
            {
              placeName: "Bridge of Peace",
              placeDescription:
                "A futuristic pedestrian bridge connecting Rike Park with the Old Town, offering stunning views.",
            },
            {
              placeName: "Tbilisi Sea",
              placeDescription:
                "A popular recreational area with beaches, water sports, and opportunities for relaxation.",
            },
          ],
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/_authenticated/trips/$tripId")({
  component: () => (
    <Trip
      city={itinerary.city}
      itinerary={itinerary.itinerary}
      daysNumber={itinerary.daysNumber}
      description={itinerary.description}
      history={itinerary.history}
    />
  ),
});
