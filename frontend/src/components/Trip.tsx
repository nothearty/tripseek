import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { photosQueryOptions } from "@/lib/api"; // Assuming this is the options for Google Maps API call
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type TripProps = {
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

const PlacePhoto = ({ placeName }: { placeName: string }) => {
  const { data, isLoading, isError } = useQuery(photosQueryOptions(placeName));

  if (isLoading) {
    return (
      <div>
        <Skeleton className='w-5/6 h-5/6 rounded-sm lg:w-3/5 lg:h-36 lg:rounded-xl' />
      </div>
    );
  }

  if (isError || !data || "error" in data) {
    return <div>No photo available</div>;
  }

  return (
    <img
      src={data.photos[0]} // Assuming data.photos contains an array of photo URLs
      alt={`${placeName} photo`}
      className='w-5/6 h-5/6 rounded-sm lg:w-3/5 lg:h-36 object-cover lg:rounded-xl'
    />
  );
};

const CityPhoto = ({ cityName}: { cityName: string }) => {
  const { data, isLoading, isError } = useQuery(photosQueryOptions(cityName));

  if (isLoading) {
    return <Skeleton className='w-full h-full rounded-lg lg:rounded-xl' />;
  }

  if (isError || !data || "error" in data) {
    return null;
  }

  return (
    <img
      src={data.photos[0]} // Assuming data.photos contains an array of photo URLs
      alt={`${cityName} photo`}
      className='absolute inset-0 w-full h-full object-cover rounded-lg lg:rounded-xl'
    />
  );
};

const Trip: React.FC<TripProps> = ({
  city,
  country, 
  itinerary,
  daysNumber,
  description,
  history,
}) => {
  return (
    <div className='max-w-full max-h-full pb-32'>
      <div className='container mx-auto mt-16'>
        <div className='sm:w-3/4 xl:w-3/4 mx-auto'>
          {/* Image Card */}
          <div className='-mx-2 xl:-mx-12 mb-8 bg-cover bg-center relative rounded-lg overflow-hidden h-[200px] lg:h-[300px]'>
            <CityPhoto cityName={city + ', ' + country} />
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='p-6 sm:p-12 relative h-full flex flex-col justify-end'>
              <span className='text-white text-4xl sm:text-6xl font-bold'>
                {city}, {daysNumber} {daysNumber === 1 ? "day" : "days"}
              </span>
            </div>
          </div>
          {/* Itinerary Card with Accordion */}
          <Card className='shadow-xl lg:mx-6 xl:-mx-12'>
            <CardHeader className='text-2xl font-semibold pb-5'>
              Description
            </CardHeader>
            <CardContent>
              <span className='text-gray-700 text-lg'>{description}</span>
              <div className='text-2xl font-semibold py-5'>History</div>
              <span className='text-gray-700 text-lg'>{history}</span>
              <Accordion type='single' collapsible className='w-full mt-8'>
                {itinerary.map((dayPlan, index) => (
                  <AccordionItem
                    key={index}
                    className='border-2 border-gray-300 hover:border-gray-600 rounded-lg px-4 mb-4'
                    value={`day-${index}`}
                  >
                    <AccordionTrigger className='text-2xl font-semibold hover:no-underline'>
                      {dayPlan.day}
                    </AccordionTrigger>
                    <AccordionContent>
                      {dayPlan.parts.map((part, partIndex) => (
                        <div key={partIndex} className='mb-6'>
                          <div className='mt-3 space-y-4'>
                            {part.activities.map((activity, activityIndex) => (
                              <Card
                                key={activityIndex}
                                className='p-3 lg:p-3 lg:px-6 shadow-md'
                              >
                                <div className='flex flex-wrap'>
                                  <div className='w-1/2 flex flex-col justify-center'>
                                    <p className=' text-[14px] md:text-lg lg:text-lg font-medium lg:text-[21px] text-gray-800 mb-1 lg:mb-2 underline'>
                                      {activity.placeName}
                                    </p>
                                    <p className='text-xs md:text-lg lg:text-xl text-gray-600 leading-snug'>
                                      {activity.placeDescription}
                                    </p>
                                  </div>
                                  <div className='w-1/2 flex justify-end items-center'>
                                    <PlacePhoto
                                      placeName={activity.placeName + "( " + city + ", " + country + ")"}
                                    />
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trip;
