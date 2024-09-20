import firstImg from "../assets/seven.svg";
import secondImg from "../assets/nine.svg";
import thirdImg from "../assets/fifteen.svg";

export default function Description() {
  return (
    <div className='container -mt-1 mb-2 lg:mb-8 mx-auto max-w-5xl z-20'>
      <div
        id='about'
        className='px-6 text-center text-3xl font-bold md:text-4xl lg:px-12 xl:text-5xl'
      >
        Plan Smarter, Travel Better
      </div>
      <div className='flex flex-wrap items-center lg:mt-6'>
        <div className='w-full p-6 sm:w-1/2 md:mt-8'>
          <h3 className='mb-3 w-fit text-2xl font-bold flex leading-none text-black md:text-3xl bg-lime-100 px-1'>
            Smart Travel Planning
          </h3>
          <p className='text-gray-600'>
            We take the guesswork out of travel. By analyzing your chosen
            destinations and preferences, we build a seamless itinerary that
            matches your pace and interests.
          </p>
        </div>
        <div className='w-full px-6 sm:w-1/2 flex justify-center'>
          <img src={firstImg} className='w-64 h-64 lg:ml-8' />
        </div>
      </div>
      <div className='flex flex-col-reverse flex-wrap sm:flex-row'>
        <div className='w-full sm:w-1/2 flex justify-center'>
          <img src={secondImg} className='w-64 h-64' />
        </div>
        <div className='mt-8 w-full px-6 sm:w-1/2 flex items-center'>
          <div className=''>
            <h3 className='mb-3 w-fit text-2xl font-bold leading-none text-black md:text-3xl bg-lime-100 px-1'>
              Customized Activities
            </h3>
            <p className='mb-8 text-gray-600'>
              Every traveler is unique, and so are the itineraries from
              tripseek. Whether you're a foodie, a history buff, or an outdoor
              enthusiast, our AI ensures your trip reflects your passions.
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-center'>
        <div className='w-full px-6 sm:w-1/2 md:mt-8'>
          <h3 className='mb-3 w-fit text-2xl font-bold leading-none text-black md:text-3xl bg-lime-100 px-1'>
            Instant Itineraries
          </h3>
          <p className='text-gray-600'>
            Forget hours of planning, tripseek generates detailed itineraries in
            minutes. From must-see spots to unique activities, everything is
            organized for you. And the best part? It's completely free.
          </p>
        </div>
        <div className='w-full p-6 sm:w-1/2 flex justify-center'>
          <img src={thirdImg} className='w-64 h-64 lg:ml-8' />
        </div>
      </div>
    </div>
  );
}
