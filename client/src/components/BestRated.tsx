import Card from './Card'
import MaxWidthWrapper from './MaxWidthWrapper'
import { IoChevronUp } from "react-icons/io5";
import { HiMiniArrowRight } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import { CATEGORIES } from '../lib/data';
import axios from "axios"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const BestRated = () => {
    const [isOpen, setIsOpen]  = useState<boolean >(false)
    const [category, setCategory] = useState<{
        id: number
        name: string;
        slug: string;
    }>(CATEGORIES[0]) 
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
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products`)
    
        setData(response.data.products)
      }
  
      useEffect(() => {
        getProducts()
      }, [])

  return (
    <MaxWidthWrapper className='font-rubik text-text'>
        <div className='flex flex-col py-6 w-full md:pb-8 lg:pb-12'>
            <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-2'>
                <h1 className='text-2xl lg:text-3xl text-center'>Best rated {category.name}</h1>
                <div className='flex gap-4'>
                <div className='relative'>
                    <button className='px-2 md:w-32 h-8 md:h-10 rounded-full bg-accent-teal shadow text-primary font-smooch text-xl font-semibold flex items-center justify-center gap-1' onClick={() => setIsOpen(prev => !prev)}>
                        Category
                         <IoChevronUp className={`${isOpen ? 'rotate-0' : 'rotate-180'} duration-150`}/> 
                    </button>
                    {isOpen ? <div className='absolute top-full right-2 translate-y-1 w-52 bg-secondary shadow-sm border border-border rounded z-50 flex flex-col p-2 gap-2'>
                        {CATEGORIES.map((item) => <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' key={item.id} onClick={() => {
                            setCategory(item)
                            setIsOpen(false)
                        }}>{item.name}</p>)}
                    </div> : null}
                </div>
                <Link to={`/products?category=${category.slug}`} className='px-2 md:w-32 h-8 md:h-10 rounded-full bg-accent-teal-200 shadow text-text font-smooch text-xl font-semibold flex items-center justify-center gap-1'>
                    Explore
                    <HiMiniArrowRight />
                </Link>
            </div>
            </div>
            {data.length ? <Carousel className='py-6 lg:py-10'
            responsive={responsive}
            showDots={true}>
            {data.length && data?.map((item) => <div key={item._id} className='px-2 flex items-center justify-center'>
                <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} />
            </div>)}
            {data.length && data?.map((item) => <div key={item._id} className='px-2 flex items-center justify-center'>
                <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} />
            </div>)}

            </Carousel> : null}
        </div>
    </MaxWidthWrapper>
  )
}

export default BestRated