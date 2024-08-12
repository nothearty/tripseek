import { Link } from "@tanstack/react-router";

export default function NoTripsPage() {
  return (
    <>
      <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='font-semibold text-5xl text-lime-500'>No Trips</p>
          <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            You don't have any trips yet
          </h1>
          <p className='mt-6 text-base leading-7 text-gray-600'>
            It looks like you haven't created any trips. Start planning your
            next adventure now!
          </p>
          <div className='mt-6 flex items-center justify-center gap-x-4'>
            <Link
              to='/trip-form'
              className='rounded-md bg-lime-500 px-6 py-2 text-lg font-semibold text-white shadow-sm hover:bg-lime-600 focus-visible:outline hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500'
            >
              Create a Trip
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
