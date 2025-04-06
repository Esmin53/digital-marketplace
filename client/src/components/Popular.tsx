import Card from './Card'
import MaxWidthWrapper from './MaxWidthWrapper'
import { useEffect, useState } from 'react';
import axios from "axios"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SkeletonCard from './SkeletonCard';

const Popular = () => {
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
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-popular-products`)

        setData(response.data.products)
      } catch (error) {
          console.error(error)
      } finally {
        setIsLoading(false)
      }
      }
  
      useEffect(() => {
        getProducts()
      }, [])

  return (
    <MaxWidthWrapper className='bg-secondary font-rubik text-text'>
        <div className='flex flex-col py-6 w-full'>
            <div className='w-full flex flex-col items-center justify-between gap-2'>
                <h1 className='text-2xl lg:text-3xl xl:text-4xl text-center'>Our most popular products</h1>
                <p className='text-center md:text-lg'>Browse through a collection of products most sought after by our users</p>
            </div>
            {isLoading ? <Carousel className='py-6 lg:py-10'
            responsive={responsive}
            showDots={true}>
              <SkeletonCard className='px-2' color='bg-primary/75'/>
              <SkeletonCard className='px-2' color='bg-primary/75'/>
              <SkeletonCard className='px-2' color='bg-primary/75'/>
              <SkeletonCard className='px-2' color='bg-primary/75'/>
              <SkeletonCard className='px-2' color='bg-primary/75'/>
            </Carousel> : null}
            {data.length && !isLoading ? <Carousel 
            className='py-6 lg:py-10'
            responsive={responsive}
            showDots={true}>
            {data.length && data?.map((item) => <div key={item._id} className='px-2 flex items-center justify-center'>
                <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} />
            </div>)}
            </Carousel> : null}
        </div>
    </MaxWidthWrapper>
  )
}

export default Popular