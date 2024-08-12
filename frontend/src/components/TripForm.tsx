"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Activities from "./Activities";
import TravelDays from "./TravelDays";
import { CityCombobox } from "@/components/CityCombobox";
import { clientApi, getCity, addTrip } from "@/lib/api";
import { useEffect, useState } from "react";
import { User } from "@server/sharedTypes";
import { NotLoggedIn } from "@/components/NotLoggedInPage";

import { toast } from "sonner";

const formSchema = z.object({
  city: z.string().nonempty("City is required"),
  days: z.number().min(1, "Number of days must be at least 1"),
  activities: z.array(z.string()).min(1, "At least one activity is required"),
  other: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function TripForm() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); // Stato per gestire il caricamento

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Stop il caricamento una volta finito
      }
    }
    fetchUser();
  }, []);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      days: 1,
      activities: [],
      other: "",
    },
  });

  if (isLoading) {
    return <p>Loading...</p>; // Optional: Messaggio di caricamento
  }

  if (!user) {
    return <NotLoggedIn />;
  }

  const { setValue, handleSubmit, control, watch, register } = form;
  const activitiesValue = watch("activities");
  const daysValue = watch("days");
  const cityValue = watch("city");

  async function fetchOrCreateCity(city: string, country: string) {
    try {
      const cityJson = await getCity(city);

      if (cityJson) {
        console.log("City found:", JSON.stringify(cityJson, null, 2));
        return cityJson;
      }

      console.log("City not found, creating new city");
      const postCityRes = await clientApi.cities.$post({
        json: {
          name: city,
          country: country,
        },
      });

      console.log("City created:", postCityRes);

      return await postCityRes.json();
    } catch (error) {
      console.error("Error fetching or creating city:", error);
      throw new Error("Failed to fetch or create city");
    }
  }

  async function onSubmit(values: FormSchemaType) {
    try {
      console.log("values", values);

      if (!user) {
        console.error("User is undefined");
        return;
      }

      const [city, country] = values.city.split("-");

      const cityJson = await fetchOrCreateCity(city, country);
      console.log("cityJson", cityJson);
      if (!cityJson) {
        console.error("City not found or failed to create");
        return;
      }

      console.log("Creating trip");
      console.log(
        "cityJson",
        JSON.stringify(
          {
            city_id: `${cityJson.id}`,
            days: values.days,
            activities: values.activities,
            other: values.other,
          },
          null,
          2
        )
      );
      await addTrip({
        city_id: `${cityJson.id}`,
        days: values.days,
        activities: values.activities,
        other: values.other,
      });

      toast("Trip Created", {
        description: "Successfully created a new trip to " + city,
      });
      console.log("Trip successfully created");
    } catch (error) {
      toast("Error creating trip", {
        description: "An error occurred while creating the trip",
      });
      console.error("Error creating trip:", error);
    }
  }

  return (
    <div className='max-w-full max-h-full pb-20'>
      <div className='container mx-auto mt-8'>
        <div className='sm:w-2/3 xl:w-1/2 mx-auto'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mb-2'>
            Customize Your Travel Experience
          </h1>
          <p className='text-gray-500 mb-8'>
            Provide us with some key details, and our trip planner will craft a
            personalized itinerary designed to give you unforgettable travel
            experience.
          </p>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-10'>
              <div className='space-y-6'>
                <FormField
                  name='city'
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormLabel>Where do you want to go?</FormLabel>
                      <FormControl>
                        <CityCombobox
                          setValue={setValue}
                          register={register("city")}
                          value={cityValue}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-6'>
                <FormField
                  name='days'
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        How many days will you be traveling?
                      </FormLabel>
                      <FormControl>
                        <TravelDays setValue={setValue} value={daysValue} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-6'>
                <FormField
                  name='activities'
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        What activities are you excited about?
                      </FormLabel>
                      <FormControl>
                        <Activities
                          setValue={setValue}
                          value={activitiesValue}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
