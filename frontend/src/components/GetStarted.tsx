import travelerImage from "../assets/five.svg";

export default function GetStarted() {
  return (
    <div className='container mx-auto text-center bg-white min-h-[70vh] md:min-h-[95vh] flex flex-col relative items-center justify-center'>
      <h1 className='max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl font-bold mb-0 sm:mb-0 flex justify-center flex-wrap text-gray-900 leading-8 lg:leading-12'>
        Effortless Travel,
      </h1>
      <h1 className='max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 flex justify-center flex-wrap text-lime-500 leading-tight'>
        Expertly Planned
      </h1>
      <p className='max-w-5xl mx-auto sm:leading-2 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-gray-600 sm:px-36'>
        Transform your travel dreams into reality. Our AI-driven planner curates
        detailed itineraries based on your preferences, ensuring every trip is
        perfectly suited to you.
      </p>
      <a
        href='/trip-form'
        className='start-button text-sm md:text-base rounded-lg px-4 py-2 md:px-6 bg-zinc-900 text-white hover:opacity-90 transition-all duration-300 font-medium flex items-center z-10'
        aria-label='Get started for free'
      >
        Get started for free
      </a>
      <div className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 lg:-mt-4'>
        <img src={travelerImage} className='w-full h-full' />
      </div>
    </div>
  );
}
