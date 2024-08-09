export default function LandingPage() {
  return (
    <div className='container mx-auto text-center p-6 bg-101010 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='max-w-5xl mx-auto text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 flex justify-center flex-wrap leading-tight text-gray-900'>
        Lorem Ipsum Dolor Sit{" "}
        <span className='text-lime-500'>Lorem Ipsum Dolor</span>
      </h1>
      <p className='max-w-5xl mx-auto sm:leading-8 text-base sm:text-xl mb-8 sm:mb-12 text-gray-600 sm:px-36'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat
        beatae magnam recusandae accusantium alias totam sit, quidem
        necessitatibus eaque repellat vero obcaecati vel consequuntur ex aut
        numquam blanditiis velit.
      </p>
      <a
        href='/v2/trip-planner'
        className='start-button bg-zinc-900 text-white py-3 px-6 rounded-md hover:bg-blue transition duration-300'
        aria-label='Get started for free'
      >
        Get started for free
      </a>
    </div>
  );
}
