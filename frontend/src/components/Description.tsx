import firstImg from "../assets/seven.svg"
import secondImg from "../assets/nine.svg"
import thirdImg from "../assets/fifteen.svg"

export default function Description() {
  return (
    <div className='container m-8 mx-auto max-w-5xl'>
      <h2 className='px-6 text-center text-3xl font-bold md:text-4xl lg:px-12 xl:text-5xl'>
        Lorem ipsum dolor sit amet
      </h2>
      <div className='mb-4 w-full'>
        <div className='mx-auto h-1 bg-primary w-64 my-0 mb-10 rounded-t py-0 opacity-25'></div>
      </div>
      <div className='flex flex-wrap items-center'>
        <div className='w-full p-6 sm:w-1/2 md:mt-8'>
          <h3 className='mb-3 w-fit bg-primary-green/70 text-2xl font-bold leading-none text-black md:text-3xl bg-lime-100 px-1'>
            Lorem ipsum dolor
          </h3>
          <p className='text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
            error in cum. Et laborum veniam, totam quod soluta perspiciatis
            dignissimos adipisci corrupti dolorum unde expedita, repellat
            delectus quibusdam cum consequuntur?
          </p>
        </div>
        <div className='w-full p-6 sm:w-1/2 flex justify-center'>
          <img src={firstImg} className='w-64 h-64 ml-8' />
        </div>
      </div>
      <div className='flex flex-col-reverse flex-wrap sm:flex-row'>
        <div className='w-full p-6 sm:w-1/2 flex justify-center'>
          <img src={secondImg} className='w-64 h-64' />
        </div>
        <div className='mt-8 w-full p-6 sm:w-1/2 flex items-center'>
          <div className=''>
            <h3 className='mb-3 w-fit bg-primary-green/70 text-2xl font-bold leading-none text-black md:text-3xl bg-lime-100 px-1'>
              Lorem ipsum dolor
            </h3>
            <p className='mb-8 text-gray-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              aspernatur consequatur veniam nam eaque deleniti corrupti a!
              Inventore officiis temporibus error totam. Totam asperiores
              architecto, necessitatibus laboriosam amet illum aut.
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-center'>
        <div className='w-full p-6 sm:w-1/2 md:mt-8'>
          <h3 className='mb-3 w-fit bg-primary-green/70 text-2xl font-bold leading-none text-black md:text-3xl bg-lime-100 px-1'>
            Lorem ipsum dolor
          </h3>
          <p className='text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam
            error in cum. Et laborum veniam, totam quod soluta perspiciatis
            dignissimos adipisci corrupti dolorum unde expedita, repellat
            delectus quibusdam cum consequuntur?
          </p>
        </div>
        <div className='w-full p-6 sm:w-1/2 flex justify-center'>
          <img src={thirdImg} className='w-64 h-64 ml-8' />
        </div>
      </div>
    </div>
  )
}
