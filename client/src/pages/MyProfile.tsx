import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'
import { useEffect } from 'react'
import UsersProducts from '../components/UsersProducts'
import Orders from '../components/Orders'
import Stats from '../components/Stats'
import UploadedProducts from '../components/UploadedProducts'

const MyProfile = () => {
    const { currentUser } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
      if(!currentUser) {
        navigate('/')
      }
    }, [])

    if(!currentUser) {
      return (
        <div className='min-h-screen flex flex-col text-text font-rubik'>
          <Navbar /> 
          <MaxWidthWrapper className="bg-secondary flex flex-col">
              <div className="flex w-full items-start justify-between py-2 lg:py-4">
                <div className=" flex flex-col ">
                    <h1 className="text-5xl md:text-6xl font-semibold font-smooch">My Profile</h1>
                    <p className="text-lg"><Link to={'/'}>Home</Link> /<Link to={'/my-profile'}>My Profile</Link></p>
                </div>
              </div>
              <div className="flex items-end justify-end py-4">
                <h2 className="font-playwrite text-xs sm:text-xl font-semibold text-white ">Top Quality Digital Assets On Your Fingertips.</h2>
              </div>
            </MaxWidthWrapper>
        <MaxWidthWrapper className='flex-1 items-start'>
          <div className="flex-1 flex flex-col items-center justify-center py-4 gap-4">
            
          </div>
        </MaxWidthWrapper>
          <Footer />
        </div>
      )
    }

  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
      <Navbar /> 
      <MaxWidthWrapper className="bg-secondary flex flex-col">
          <div className="flex w-full items-start justify-between py-2 lg:py-4">
            <div className=" flex flex-col ">
                <h1 className="text-5xl md:text-6xl font-semibold font-smooch">My Profile</h1>
                <p className="text-lg"><Link to={'/'}>Home</Link> /<Link to={'/my-profile'}>My Profile</Link></p>
            </div>
          </div>
          <div className="flex items-end justify-end py-4">
            <h2 className="font-playwrite text-xs sm:text-xl font-semibold text-white ">Top Quality Digital Assets On Your Fingertips.</h2>
          </div>
        </MaxWidthWrapper>
    <MaxWidthWrapper className='flex-1 items-start'>
    <div className="flex-1 flex flex-col-reverse md:flex-row py-4 gap-4">
        <div className='flex-1 flex flex-col gap-2 md:gap-4'>
          <UsersProducts />
          <UploadedProducts />            
        </div>
        <div className='w-full flex flex-col md:max-w-80 items-center p-2'>
          <div className=' md:max-w-48 xl:max-w-80 p-2 flex flex-col gap-1.5 h-fit items-center justify-center'>
              <p className='text-5xl md:text-6xl font-smooch text-gray-900'>{currentUser?.user.username}</p>
          </div>
          <Orders />
        </div>
      </div>
    </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Stats />
      </MaxWidthWrapper>
      <Footer />
    </div>
  )
}

export default MyProfile