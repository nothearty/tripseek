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
