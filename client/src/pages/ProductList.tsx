import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import Navbar from "../components/Navbar"
import Products from "../components/Products"
import { CATEGORIES } from "../lib/data"
import { IoChevronUp } from "react-icons/io5";
import { FaArrowLeft, FaCheck, FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom"
import axios from "axios"
import Pagination from "../components/Pagination"
import { SiGhostery } from "react-icons/si";


const ProductList = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || null;

  const [isOpen, setIsOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [category, setCategory] = useState<string | null>(initialCategory)
  const [subCategory, setSubCategory] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string>("title-desc")
  let [page, setPage] = useState<number >(1)
  let [totalResults, setTotalResults] = useState<number >(0)
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
  const [isLoading, setIsLoading] = useState(true)

  const getProducts = async () => {
    setIsLoading(true)
     try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products?$limit=20&${subCategory !== null ? `subCategory=${subCategory}` : ""}&orderBy=${orderBy}&limit=20&page=${page}&${category !== null ? `category=${category}` : ""}`)

      setData(response.data.products)
      setTotalResults(response.data.totalResults)
     } catch (error) {
      
     } finally {
       setIsLoading(false)
     }
  }

  useEffect(() => {
    setPage(1)
  }, [subCategory, orderBy])

  useEffect(() => {
    getProducts()
  }, [subCategory, orderBy, page, category])

  console.log("Page Number: ", page)

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
                    <h3 className={`font-medium cursor-pointer ${category === item.slug ? "border-b border-accent-teal-300 w-fit" : ""}`} onClick={(() => {
                      setCategory(prev => prev !== item.slug ? item.slug : null)
                      setSubCategory(null)
                    })}>{item.name}</h3>
                    {item.subcategories.map((item) => (
                      <div key={item.id} className="flex items-center justify-start gap-1 ml-3" onClick={() => {
                        setSubCategory(prev => prev !== item.slug ? item.slug : null)
                        setCategory(null)
                      }}>
                        {subCategory === item.slug ? <FaCheck className="text-sm text-accent-gray"/> : null}
                        <p className=" text-accent-gray cursor-pointer">{item.name}</p>
                      </div>
                      ))}
                </div>)}
            </div>

            <div className="flex-1 py-2">
              <div className="w-full p-2 flex items-center border-b border-accent-lightgray gap-4">
                  <div className="text-2xl cursor-pointer flex lg:hidden" onClick={() => setFiltersOpen(prev => !prev)}>
                    {filtersOpen ? <FaFilterCircleXmark /> : <FaFilter />}
                  </div>
                  <p className="mr-auto">Showing {(page-1)*20 + 1}-{totalResults > 20 ? page * 20 : totalResults} out of {totalResults}</p>

                  <div className='relative ml-auto flex-1'>
                      <button className='px-2 font-smooch text-xl font-semibold flex items-center justify-center gap-1 ml-auto' onClick={() => setIsOpen(prev => !prev)}>
                        Order by
                        <IoChevronUp className={`${isOpen ? 'rotate-0' : 'rotate-180'} duration-150`}/> 
                      </button>
                    {isOpen ? <div className='absolute top-full right-2 translate-y-1 w-52 bg-primary shadow-sm border border-border rounded z-50 flex flex-col p-2 gap-2'>
                         <p className='text-sm text-gray-600 p-2 cursor-pointer
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' onClick={() => {
                            setOrderBy("price-asc")
                            setIsOpen(false)
                        }}>
                          {orderBy === 'price-asc' ? <FaCheck className="text-sm text-accent-gray"/> : null}
                          Price (asc)
                          </p>
                         <p className='text-sm text-gray-600 p-2 cursor-pointer
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' onClick={() => {
                            setOrderBy("price-desc")
                            setIsOpen(false)
                        }}>
                            {orderBy === 'price-desc' ? <FaCheck className="text-sm text-accent-gray"/> : null}
                            Price (desc)</p>
                         <p className='text-sm text-gray-600 p-2 cursor-pointer
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' onClick={() => {
                            setOrderBy("title-asc")
                            setIsOpen(false)
                        }}>
                          {orderBy === 'title-asc' ? <FaCheck className="text-sm text-accent-gray"/> : null}
                          Title (asc)</p>
                         <p className='text-sm text-gray-600 p-2 cursor-pointer
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' onClick={() => {
                            setOrderBy("title-desc")
                            setIsOpen(false)
                        }}>
                          {orderBy === 'title-desc' ? <FaCheck className="text-sm text-accent-gray"/> : null}
                          Title (desc)</p>
                    </div> : null}
                </div>

                  <div className="flex ml-auto">

                  </div>
              </div>
              <Products products={data}/>
              {!isLoading && totalResults === 0 ? <div className="w-full h-full flex flex-col items-center justify-center gap-2 min-h-96 px-2">
                <SiGhostery className="text-accent-gray/50 text-6xl" />
                <p className="text-3xl sm:text-4xl text-accent-gray/70 font-smooch text-center">Nothing here... Try a different search!</p>
              </div> : null}
              {totalResults !== 0 ? <Pagination currentPage={page} setPage={setPage} totalResults={totalResults} /> : null}
            </div>
  
        </div>
        </div>
     </div>
      <Footer />
    </div>
  )
}

export default ProductList