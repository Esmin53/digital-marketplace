import { HiMiniArrowRight } from "react-icons/hi2";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <MaxWidthWrapper className="bg-secondary md:h-96 lg:h-[25rem] xl:h-[26rem] py-4 sm:py-6 sm:overflow-hidden">
    <div className='flex-1 h-full flex flex-col-reverse sm:flex-row gap-4 lg:gap-6 '>
        <div className=' flex items-center sm:items-start justify-center flex-col gap-2 md:gap-4 w-full sm:w-fit z-40'>
            <h1 className='text-center sm:text-start text-4xl lg:text-5xl font-bold font-smooch'>Worlds Best <span className='text-accent-teal'>Digital Marketplace</span> <br />For Icons, Fonts, Music and <br /> <span className='text-accent-teal'>much more!</span></h1>
            <p className='font-medium text-sm lg:text-base font-rubik text-gray-600'>World of digital assets, just one click away from you.</p>
            <div className='flex gap-4 xl:gap-6'>
                <Link to='/new-product' className='px-3 h-8 md:w-28 lg:w-32 md:h-9 lg:h-10 rounded-full bg-accent-teal shadow-sm text-primary font-smooch sm:text-lg md:text-xl font-semibold flex items-center justify-center'>
                    Start Selling
                </Link>
                <button className='px-3 h-8 lg:w-32 md:h-9 lg:h-10 rounded-full border-2 border-accent-teal shadow-sm text-accent-teal flex items-center justify-center gap-1'>
                    <p className='sm:text-lg md:text-xl font-smooch font-semibold'>Explore Now</p>
                    <HiMiniArrowRight className='text-xl'/>
                </button>
            </div>
        </div>
        <div className='flex-1 flex sm:flex-col md:flex-row items-center justify-center'>
            <img src='https://img.freepik.com/free-vector/computer-finger-shopping-icons_23-2147659638.jpg?t=st=1737589319~exp=1737592919~hmac=11057567bdbee2447d881b2af1394b01189cab3c0fe4dad769d7250b5286495f&w=740'
            className='w-1/3 max-w-32 sm:max-w-56 sm:translate-x-2/4 translate-x-1/4 translate-y-1/3 md:max-w-60 aspect-square rounded-md shadow md:translate-x-12 -rotate-[16deg] sm:rotate-0' />
            <img src='https://img.freepik.com/free-psd/3d-rendering-online-order-parcel-delivery_1150-65880.jpg?t=st=1737591351~exp=1737594951~hmac=68bea7ca3a9bfdf072ce3ffc7a47c67cadf401d6c11606a3250d85212f5be59b&w=740'
            className='w-1/3 max-w-32 sm:max-w-56  md:max-w-60 aspect-square rounded-md  shadow z-10 md:-translate-y-12' />
            <img src='https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34863.jpg?t=st=1737589066~exp=1737592666~hmac=5f030f865d1edbe14639f911bd67b3ad4cf309eece3a2319904b2cb6251407e4&w=740'
            className='w-1/3 max-w-32 sm:max-w-56 -translate-y-1/3 -translate-x-1/4 sm:-translate-y-1/2 sm:-translate-x-2/4 md:max-w-60 aspect-square rounded-md shadow md:translate-y-12 md:-translate-x-12 rotate-12 sm:rotate-0' />
        </div>
    </div>
    </MaxWidthWrapper>
  )
}

export default Banner