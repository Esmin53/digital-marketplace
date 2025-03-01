import { FaStar, FaStarHalf } from "react-icons/fa6"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useParams } from "react-router-dom"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimilarProducts from "../components/SimilarProducts"
import { useCart } from "../store/useCart"

const ProductDetail = () => {
  const [data, setData] = useState<{
    price: number
    _id: string
    title: string
    description: string
    authorId: {
      _id: string
      username: string
    }
    images: string[]
    averageRating: number
    category: string
    subCategory: string
  } | null>(null)
  const { id } = useParams()
  const [rating, setRating] = useState<JSX.Element[]>([])

  const productId = useLocation().pathname.split('/')[2]
  const {addItem, items} = useCart()

  const getProducts = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products/${productId}`)

    setData(response.data.product)

    if(true) {
      const fullStars = Math.floor(response.data?.product.averageRating )
      const hasHalfStar = response.data.product.averageRating  % 1 !== 0;
    
      const stars = [];
    
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar className="text-accent-teal text-2xl" key={`star-${i}`} />);
      }
    
      if (hasHalfStar) {
        stars.push(<FaStarHalf className="text-accent-teal text-2xl"  key="half-star" />);
      }

      setRating(stars)
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
      <div className="flex-1 flex items-center justify-center px-2 xl:px-4">
          <div className="w-full flex-1 flex flex-col py-6 md:py-12 gap-8 max-w-7xl">
          <div className="flex-1 h-full flex flex-col sm:flex-row gap-6 xl:gap-10 lg:py-8 xl:py-16">
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
                <div className="flex items-center py-2">
                  {rating.length > 0 ? rating.map((item) => item) : <p className="text-accent-gray">No ratings so far</p>}
                </div>
              <p className="text-sm sm:text-base pb-4">{data?.description}</p>
              {items.some(item => item.product._id === data?._id) ? (
  <div
    className="w-full max-w-96 rounded-md py-2 md:py-3 mt-auto mb-2 bg-button md:text-lg text-white hover:bg-button/95 flex items-center justify-center">
    In Cart
  </div>
) : (
  <button
    className="w-full max-w-96 rounded-md py-2 md:py-3 mt-auto mb-2 bg-button md:text-lg text-white hover:bg-button/95"
    onClick={() =>
      addItem({
        _id: data?._id,
        title: data?.title,
        price: data?.price,
        image: data?.images[0],
        author: data?.authorId.username
      })
    }
  >
    Add to cart
  </button>
)}
            </div>
        </div>
        {/* Replace mock data with real related products */}
          <SimilarProducts />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail