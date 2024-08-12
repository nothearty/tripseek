interface Location {
  type: "Point";
  coordinates: [number, number]; // A tuple representing longitude and latitude
}

interface City {
  cityId: string;
  name: string;
  country: string;
  altCountry: string;
  muni: string;
  muniSub: string;
  featureClass: string;
  featureCode: string;
  adminCode: string;
  population: number;
  loc: Location;
}

declare module "all-the-cities" {
  const cities: City[];
  export default cities;
}
