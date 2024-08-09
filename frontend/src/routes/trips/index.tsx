import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { tripsQueryOptions, photosQueryOptions, isLogged } from "@/lib/api";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { User } from "@server/sharedTypes";

// Aggiungi un tipo per i dati restituiti dalla query delle foto
// type PhotoQueryResult = { photos: string[] } | { error: string };

const TripPhoto = ({ cityName }: { cityName: string }) => {
  const { data, isLoading, isError } = useQuery(photosQueryOptions(cityName));

  if (isLoading) {
    return (
      <div>
        <Skeleton className='h-48 w-full rounded-lg' />
      </div>
    );
  }

  if (isError || !data || "error" in data) {
    return <div>No photo available</div>;
  }

  return (
    <img
      src={data.photos[0]} // Presumendo che data.photos contenga un array di URL delle foto
      alt={`${cityName} photo`}
      className='w-full h-48 object-cover rounded-lg'
    />
  );
};

const NotLoggedIn = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-6'>Please log in</h1>
        <p>
          You need to log in to see the trips.{" "}
          <a href='/login' className='text-blue-500 hover:underline'>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

const Trips = () => {
  const { data, isLoading, isError } = useQuery(tripsQueryOptions);
  const [logged, setLogged] = useState<{ user?: User; error?: string } | null>(
    null
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const result = await isLogged();
        setLogged(result);
      } catch (error) {
        setLogged({ error: "Failed to fetch login status" });
      }
    };

    checkLoggedIn();
  }, []);

  if (!logged) {
    return <div>Checking login status...</div>;
  }

  if (logged.error || !logged.user) {
    return <NotLoggedIn />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading trips.</div>;
  }

  const trips = data || [];

  return (
    <div className='flex'>
      <div className='pt-9 mt-7 ml-2 flex-1'>
        <h1 className='text-3xl font-bold mb-6'>Trips</h1>
        <ul className='flex flex-row flex-wrap gap-6'>
          {trips.map((trip) => (
            <li key={trip.id} className='w-[350px]'>
              <Card
                className='m-2 p-2 cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg'
                id={`${trip.id}`}
              >
                {/* Usa il componente TripPhoto per mostrare la foto */}
                <TripPhoto cityName={trip.cities[0].name} />{" "}
                {/* Usa la prima città come esempio */}
                <CardHeader>
                  <CardTitle className='text-xl font-semibold flex items-center justify-between'>
                    {trip.cities.map((city) => city.name).join(", ")}
                  </CardTitle>
                </CardHeader>
                <CardContent className='bg-gray-50 p-4 rounded-b-lg'>
                  <CardDescription className='text-gray-700'>
                    {trip.text}
                  </CardDescription>
                </CardContent>
                <CardFooter className='flex items-center justify-between bg-gray-50 p-4 rounded-b-lg'>
                  <span className='flex items-center text-gray-500'>
                    <Calendar className='h-5 w-5 mr-2' />
                    {new Date(trip.departureDate).toLocaleDateString()}
                  </span>
                  <span className='flex items-center text-gray-500'>
                    <Calendar className='h-5 w-5 mr-2' />
                    {new Date(trip.returnDate).toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/trips/")({
  component: Trips,
});

