export const NotLoggedIn = () => {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='font-semibold text-5xl text-lime-500'>401</p>
        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          You need to log in
        </h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Sorry, you must be logged in to access this page.
        </p>
        <div className='mt-6 flex items-center justify-center gap-x-4'></div>
      </div>
    </main>
  );
};
