import travelerImage from "../assets/five.svg";

export default function GetStarted() {
  return (
    <div className='container mx-auto text-center p-6 bg-white min-h-screen flex flex-col relative items-center justify-center'>
      <h1 className='max-w-5xl mx-auto text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 flex justify-center flex-wrap leading-tight text-gray-900'>
        Lorem Ipsum Dolor Sit{" "}
        <span className='text-lime-500'>Lorem Ipsum Dolor</span>
      </h1>
      <p className='max-w-5xl mx-auto sm:leading-2 text-base sm:text-xl mb-4 sm:mb-6  text-gray-600 sm:px-36'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat
        beatae magnam recusandae accusantium alias totam sit, quidem
      </p>
      <a
        href='/trip-form'
        className='start-button bg-zinc-900 text-white py-3 px-6 rounded-md hover:bg-zinc-900 transition duration-300'
        aria-label='Get started for free'
      >
        Get started for free
      </a>
      <div className=' w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mb-8'>
        <img src={travelerImage} className='w-full h-full' />
      </div>
    </div>
  );
}
