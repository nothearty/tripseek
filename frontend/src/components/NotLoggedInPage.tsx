export const NotLoggedIn = () => {
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
