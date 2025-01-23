import Card from './Card'
import MaxWidthWrapper from './MaxWidthWrapper'
import { IoChevronUp } from "react-icons/io5";
import { HiMiniArrowRight } from "react-icons/hi2";
import { useState } from 'react';
import { CATEGORIES } from '../lib/data';


const BestRated = () => {
    const [isOpen, setIsOpen]  = useState<boolean >(false)
    const [category, setCategory] = useState<{
        id: number
        name: string;
        slug: string;
    }>(CATEGORIES[0])

  return (
    <MaxWidthWrapper className='font-rubik text-text'>
        <div className='flex flex-col py-6 gap-6 lg:gap-10 w-full md:pb-8 lg:pb-12'>
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
                <button className='px-2 md:w-32 h-8 md:h-10 rounded-full bg-accent-teal-200 shadow text-text font-smooch text-xl font-semibold flex items-center justify-center gap-1'>
                    Explore
                    <HiMiniArrowRight />
                </button>
            </div>
            </div>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default BestRated