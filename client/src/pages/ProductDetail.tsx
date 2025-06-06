import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Link, useLocation, useParams } from "react-router-dom"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimilarProducts from "../components/SimilarProducts"
import SkeletonProductDetail from "../components/SkeletonProductDetail"
import { useClickOutside } from "../hooks/useOnClickOutside"
import Ratings from "../components/Ratings"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import { useAuthStore } from "../store/useAuthStore"
import AddToCartButton from "../components/AddToCartButton"

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState<boolean >(true)
  const [isRatingsOpen, setIsRatingsOpen] = useState<boolean >(false)

  const [data, setData] = useState<{
    price: number
    _id: string
    title: string
    description: string
    price_id: string
    authorId: {
      _id: string
      username: string
      purchasedProducts: string[]
    }
    images: string[]
    averageRating: number
    category: string
    subCategory: string
  } | null>(null)
  const { id } = useParams()

  const productId = useLocation().pathname.split('/')[2]
  const {currentUser} = useAuthStore()

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => {
    
    if(isRatingsOpen) setIsRatingsOpen(false)
  })

  const getProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products/${productId}`)

      setData(response.data.product)
  
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [id])
  
  if(!data) {
    return <div></div>
  }

  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
      <Navbar /> 
      <MaxWidthWrapper className="bg-secondary">
        <div className="flex w-full items-start justify-between py-2 lg:py-4">
          <div className=" flex flex-col ">
            <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Shop</h1>
            <div className="text-sm sm:text-base md:text-lg flex flex-wrap">
              <Link to={'/'} className="text-accent-gray">Home</Link> /
              <Link to={'/products'} className="text-accent-gray">Products</Link>/
              <Link to={`/products/${id}`} className="">{id}</Link></div>
          </div>
        </div>
        <div className="flex items-end justify-end py-4">
          
        </div>
      </MaxWidthWrapper>
      <div className="flex-1 flex  justify-center px-2 xl:px-4">
          <div className="w-full flex-1 flex flex-col py-2 gap-8 max-w-7xl">
          {isLoading ? <SkeletonProductDetail /> : <div className="flex-1 h-full flex flex-col sm:flex-row gap-6 xl:gap-10 lg:py-8 xl:py-16">
            {data ? <Carousel className='w-full max-w-72 sm:max-w-prose  sm:w-64 sm:h-64 md:w-80 md:h-80 lg:h-96 lg:w-96 aspect-square rounded-lg relative overflow-hidden border border-accent-lightgray/60 shadow-sm mx-auto'
            responsive={{        all: {
              breakpoint: { max: 4000, min: 0 },
              items: 1
            },}}
            showDots={true}>
              {data.images.length && data.images?.map((item, i) => <img src={item} className="object-cover w-full h-full" key={i} alt="Product image"/>)}
            </Carousel> : null}
            <div className="flex-1 flex flex-col md:gap-2">
              <div className="w-full flex items-center justify-between flex-wrap">
                <h2 className="font-medium md:text-lg">{data?.category}</h2>
                <p className="text-accent-gray text-sm">{data?.subCategory}</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-smooch">{data?.title}</h1>
              <p className="text-sm font-medium">By {data?.authorId.username}</p>
              <p className="text-4xl md:text-5xl font-bold font-smooch">
                $ {data?.price.toFixed(2)}
              </p>
              {currentUser?.user.id !== data?.authorId._id ? <Ratings initialAverageRating={data.averageRating} productId={data._id}/> : null}
              <p className="text-sm sm:text-base pb-4">{data?.description}</p>
              {data ? <AddToCartButton _id={data?._id} title={data?.title} price={data?.price} image={data?.images[0]} authorId={data.authorId} price_id={data.price_id}/> : null}
            </div>
        </div>}
          <SimilarProducts subCategory={data.subCategory} _id={data._id}/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail