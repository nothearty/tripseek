export default function TrySection() {
  return (
    <div className='mb-12 sm:mb-20 flex justify-center'>
      <div className='bg-lime-500 py-10 rounded-2xl mx-12'>
        <div className='text-center max-w-screen-sm flex flex-col space-y-4 justify-center items-center'>
          <h2 className='text-2xl sm:text-4xl text-gray-50 font-semibold sm:leading-[50px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laudantium alias laboriosam.
          </h2>
          <a
            href='/v2/trip-planner'
            className="bg-white text-zinc-900 px-6 py-2 rounded-md"
            aria-label='Try Now'
          >
            Try Now
          </a>
        </div>
      </div>
    </div>
  )
}
