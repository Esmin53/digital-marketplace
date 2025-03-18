import Card from './Card'
import { useEffect, useState } from 'react';
import axios from "axios"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SkeletonCard from './SkeletonCard';

interface SimilarProductsProps {
  subCategory: string
  _id: string
}

const SimilarProducts = ({subCategory, _id}: SimilarProductsProps) => {
    const [isLoading, setIsLoading] = useState<boolean >(true)
    const [data, setData] = useState<{
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

      const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 768, min: 640 },
          items: 3
        },
        mobilesm: {
          breakpoint: { max: 640, min: 455 },
          items: 2
        },
        mobilexs: {
          breakpoint: { max: 455, min: 0 },
          items: 1
        },
      };
    

    const getProducts = async () => {
        setIsLoading(true)
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products?subCategory=${subCategory}`)
    
          setData(response.data.products.filter((item: {_id: string}) => item._id !== _id))
        } catch (error) {
          
        } finally {
          setIsLoading(false)
        }
      }
  
      useEffect(() => {
        getProducts()
      }, [_id])

      if(data.length === 0) {
        return <div></div>
      }

  return (
        <div className='flex flex-col py-6 w-full md:pb-8 lg:pb-12'>
            <h2 className="font-medium text-xl md:text-2xl">Similar Products</h2>
            {isLoading ? <Carousel className='py-6 lg:py-10'
            responsive={responsive}
            showDots={true}>
              <SkeletonCard className='px-2' />
              <SkeletonCard className='px-2' />
              <SkeletonCard className='px-2' />
              <SkeletonCard className='px-2' />
              <SkeletonCard className='px-2' />
            </Carousel> : null}
            {data.length && !isLoading ? <Carousel className='py-6 lg:py-10'
            responsive={responsive}
            showDots={true}>
            {data.length && data?.map((item) => <div key={item._id} className='px-2 flex items-center justify-center'>
                <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} />
            </div>)}
            </Carousel> : null}
        </div>

  )
}

export default SimilarProducts