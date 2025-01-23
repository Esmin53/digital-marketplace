import { useState } from "react"
import Footer from "../components/Footer"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import Navbar from "../components/Navbar"
import Products from "../components/Products"
import { CATEGORIES } from "../lib/data"
import { IoChevronUp } from "react-icons/io5";
import { FaArrowLeft, FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { Link } from "react-router-dom"


const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className='h-screen flex flex-col text-text font-rubik'>
      <Navbar />
      
     <div className="flex-1 flex justify-center items-center">

      <div className="flex flex-col w-full h-full items-center">
        <MaxWidthWrapper className="bg-secondary">
          <div className="flex w-full items-start justify-between py-2 lg:py-4">
            <div className=" flex flex-col ">
              <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Shop</h1>
              <p className="text-lg"><Link to={'/'}>Home</Link> /<Link to={'/products'}>Products</Link></p>
            </div>
          </div>
          <div className="flex items-end justify-end py-4">
            <h2 className="font-playwrite text-xs sm:text-xl font-semibold text-white ">Top Quality Digital Assets On Your Fingertips.</h2>
          </div>
        </MaxWidthWrapper>
        <div className="w-full h-full max-w-7xl flex relative">
            <div className={`md:w-60 lg:w-72 h-full flex flex-col py-2 top-0 fixed sm:relative z-40 overflow-hidden duration-150 ease-in-out lg:-translate-x-0 px-1
              ${filtersOpen ? ' -translate-x-0 w-60' : '-translate-x-[100%] w-0 md:w-0'} border-r border-accent-lightgray shadow bg-primary left-0`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-smooch text-4xl font-semibold">Filters</h2>
                  <div className=" mr-2 text-xl lfex lg:hidden" onClick={() => setFiltersOpen(prev => !prev)}>
                    <FaArrowLeft />
                  </div>
                </div>
                {CATEGORIES.map((item) => <div key={item.id} className="flex flex-col">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.subcategories.map((item) => <p key={item.id} className="ml-3 text-accent-gray cursor-pointer">{item.name}</p>)}
                </div>)}
            </div>

            <div className="flex-1 py-2">
              <div className="w-full p-2 flex items-center border-b border-accent-lightgray gap-4">
                  <div className="text-2xl cursor-pointer flex lg:hidden" onClick={() => setFiltersOpen(prev => !prev)}>
                    {filtersOpen ? <FaFilterCircleXmark /> : <FaFilter />}
                  </div>
                  <p>Showing 0-18 out of 67</p>
                  <div className="flex ml-auto">
                    <button className='px-2 font-smooch text-xl font-semibold flex items-center justify-center gap-1' onClick={() => setIsOpen(prev => !prev)}>
                        Order by
                        <IoChevronUp className={`${isOpen ? 'rotate-0' : 'rotate-180'} duration-150`}/> 
                      </button>
                  </div>
              </div>
              <Products />
            </div>
  
        </div>
        </div>
     </div>
      <Footer />
    </div>
  )
}

export default ProductList