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
import {
  tripsQueryOptions,
  photosQueryOptions,
  userQueryOptions,
} from "@/lib/api";
import { Calendar } from "lucide-react";
import NoTripsPage from "@/components/NoTripsPage";
import { TripProps } from "@server/sharedTypes";
import { useNavigate } from "@tanstack/react-router";

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

  const randomPhotoIndex = Math.floor(Math.random() * data.photos.length);
  const randomPhoto = data.photos[randomPhotoIndex];

  return (
    <img
      src={randomPhoto}
      alt={`${cityName} photo`}
      className='w-full h-48 object-cover rounded-lg'
    />
  );
};

const Trips = () => {
  const { isPending, error, data: user } = useQuery(userQueryOptions);
  const { data, isLoading, isError } = useQuery(
    tripsQueryOptions(user?.user.id ?? "")
  );
  const navigate = useNavigate();

  if (isPending) return "loading";
  if (error) return "not logged in";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading trips.</div>;
  }

  const trips = Array.isArray(data) ? data : [];

  if (!trips.length) {
    return <NoTripsPage />;
  }

  const handleTripClick = (tripId: number) => {
    // Naviga a una pagina di dettagli del viaggio
    navigate({
      to: `/trips/${tripId}`,
    });
  };

  return (
    <div className='flex'>
      <div className='pt-9 mt-7 ml-2 flex-1'>
        <h1 className='text-3xl font-bold mb-6'>Trips</h1>
        <ul className='flex flex-row flex-wrap gap-6'>
          {trips.map((trip) => {
            let tripData: TripProps;
            try {
              tripData = JSON.parse(trip.text);
            } catch (error) {
              console.error("Error parsing trip text:", error);
              tripData = {
                description: "Description not available",
              } as TripProps;
            }

            return (
              <li key={trip.id} className='w-[350px]'>
                <Card
                  className='m-2 p-2 cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg'
                  id={`${trip.id}`}
                  onClick={() => handleTripClick(trip.id)}
                >
                  <TripPhoto cityName={trip.cities[0].name} />{" "}
                  <CardHeader>
                    <CardTitle className='text-xl font-semibold flex items-center justify-between'>
                      {trip.cities.map((city) => city.name).join(", ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='bg-gray-50 p-4 rounded-b-lg'>
                    <CardDescription className='text-gray-700'>
                      {tripData.description?.substring(0, 255)}...
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
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/trips/")({
  component: Trips,
});
