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
import Activities from "./components/Activities";
import TravelDays from "./components/TravelDays";
//import { Input } from "@/components/ui/input"
import { CityCombobox } from "@/components/CityCombobox";
import BackButton from "./BackButton";

const formSchema = z
  .object({
    city: z.string().nonempty("City is required"),
    days: z.number().min(1, "Number of days must be at least 1"),
    activities: z.array(z.string()),
    other: z.optional(z.string()),
  })
  .refine(
    (data) =>
      data.activities.length > 0 ||
      (data.other && data.other.trim().length > 0),
    {
      message:
        "You must select at least one activity or provide other information.",
      path: ["activities"],
    }
  );

type FormSchemaType = z.infer<typeof formSchema>;

export default function TripForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      days: 1,
      activities: [],
      other: "",
    },
  });

  const { setValue, register, handleSubmit, control, watch } = form;

  const activitiesValue = watch("activities");
  const daysNumberValue = watch("days");
  const cityValue = watch("city");

  function onSubmit(values: FormSchemaType) {
    console.log(values);
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
                        <TravelDays
                          setValue={setValue}
                          value={daysNumberValue}
                        />
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
              <div className='flex w-full justify-between'>
                <BackButton />
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
