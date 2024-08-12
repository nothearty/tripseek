export interface User {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
}

export interface TripInput {
  city: string;
  days: number;
  activities: string[];
  other?: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
}

export interface Trip {
  id: string;
  departureDate: string;
  returnDate: string;
  text: string;
  cities: City[];
}
