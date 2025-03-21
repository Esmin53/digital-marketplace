import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'
import axios from "axios"
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import SkeletonCard from '../components/SkeletonCard'
import UsersProducts from '../components/UsersProducts'
import Orders from '../components/Orders'
import Stats from '../components/Stats'

const MyProfile = () => {
    let { currentUser } = useAuthStore()

    const [products, setProducts] = useState<{
        price: number
        _id: string
        title: string
        authorId: {
          _id: string
          username: string
        }
        images: string[]
        averageRating: number
      }[]>([])
      const [isLoading, setIsLoading] = useState<boolean >(false)

    const getUserInfo = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-user/${currentUser?.user.id}`)

            setProducts(response.data.products)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

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
            <div className="w-full flex flex-col">
              <h1 className="font-smooch text-4xl">Your products</h1>
              <div className="h-[0.5px] w-full bg-accent-lightgray/60 shadow-sm" />
              <p className="text-lg text-accent-gray">Here is a list of products you uploaded.</p>
            </div>
            {isLoading ? <div className='flex-1 grid place-items-center sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div> : null}
            <div className='flex-1 grid place-items-center sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((item) => <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} key={item._id}/>)}
            </div>
            
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