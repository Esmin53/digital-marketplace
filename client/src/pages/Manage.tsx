import { Link, useParams } from "react-router-dom"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuthStore } from "../store/useAuthStore"
import { LuLoaderCircle } from "react-icons/lu"
import { toast, Toaster } from "sonner"


const Manage = () => {
    const { id } = useParams()

    const {currentUser} = useAuthStore()

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
      const [isLoading, setIsLoading] = useState<boolean >(false)
      const [title, setTitle] = useState<string | null >(null)
      const [description, setDescription] = useState<string | null >(null)
      const [isUpdating, setIsUpdating] = useState<boolean >(false)

      const getProducts = async () => {
        setIsLoading(true)
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products/${id}`)
    
    
          console.log("Price Id: ", response.data.product.authorId.purchasedProducts)
          setData(response.data.product)
          setTitle(response.data.product.title)
          setDescription(response.data.product.description)
      
        } catch (error) {
          
        } finally {
          setIsLoading(false)
        }
      }

      const updateProduct = async () => {
        if(isUpdating) return
        setIsUpdating(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/product/update-product/${id}`, {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
              })

              if(response.status === 200) {
                toast.success('Product updated succesfully!')      
                return
              }
                  
              if(response.status === 404) {
                toast.error(response.data.message)
              }

              if(response.status === 401) {
                toast.error(response.data.message)
              }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUpdating(false)
        }
      }
    
      useEffect(() => {
        getProducts()
      }, [id])

    return (
        <div className='min-h-screen flex flex-col text-text font-rubik'>
        <Navbar /> 
        <MaxWidthWrapper className="bg-secondary flex flex-col">
            <div className="flex w-full items-start justify-between py-2 lg:py-4">
              <div className=" flex flex-col ">
                  <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Manage Product</h1>
                  <p className="text-lg flex"><Link to={'/my-profile'}>My Profile</Link> /<span>Manage</span>/<Link to={`/manage/${id}`}>{id}</Link></p>
              </div>
            </div>
          </MaxWidthWrapper>
      <MaxWidthWrapper className='flex-1'>
        <div className="flex-1 flex flex-col gap-4 md:gap-2">
        <div className="w-full pt-2">
            <h1 className="text-4xl font-semibold font-smooch">{data?.title}</h1>
        </div>
        <div className="w-full flex flex-col md:flex-row p-2">
        <div className="w-full aspect-square md:w-72 md:h-72 lg:w-96 lg:h-96 grid grid-cols-3 grid-rows-3 gap-1 p-1 bg-accent-lightgray/10 border-accent-lightgray/15 border-2 shadow-sm">
            {data?.images.map((item) => <div className="relative" key={item}>
                <img src={item} className="w-full h-full object-cover rounded" />
            </div>)}

        </div>
        <div className="flex-1 flex flex-col md:px-2 lg:px-4 py-2 gap-2">
            <div className="w-full">
                <label className="font-medium">Title</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-accent-lightgray/10 px-2 outline-secondary" placeholder="Your products title" value={title || ""} onChange={(e) => setTitle(e.target.value)}/>
                {/*errors.title ? <p className="text-xs text-red-400">{errors.title.message}</p> : null*/}
            </div>
            <div className="w-full flex flex-col">
                <label className="font-medium">Description</label>
                <textarea className="w-full h-52 md:h-64 rounded shadow-sm border border-accent-lightgray bg-accent-lightgray/10 px-2 outline-secondary" placeholder="More about your product" value={description || ""} onChange={(e) => setDescription(e.target.value)}/>
                {/*errors.description ? <p className="text-xs text-red-400">{errors.description.message}</p> : null*/}
            </div>
            <button className="w-full h-12 bg-button rounded shadow-sm text-white flex items-center justify-center" onClick={() => updateProduct()}>
                {isUpdating ? <LuLoaderCircle className="animate-spin lg:text-xl"/> : "Update"}
            </button>
        </div>
        </div>
        </div>
      </MaxWidthWrapper>
        
        <Footer />
        <Toaster richColors={true} position="top-center"/>
      </div>
    )
}

export default Manage