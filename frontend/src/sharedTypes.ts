export interface Location {
  longitude: number
  latitude: number
  name: string
  description: string
  image: string
}


export type TripProps = {
    city: string;
    country: string;
    daysNumber: number;
    description: string;
    history: string;
    itinerary: {
      day: string;
      parts: {
        activities: {
          placeName: string;
          placeDescription: string;
        }[];
      }[];
    }[];
  };
  