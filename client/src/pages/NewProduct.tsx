import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useAuthStore } from "../store/useAuthStore"
import { Link, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ProductValidator, TProductValidator} from "../../../shared/validators/product"
import { FaCheckDouble, FaChevronDown, FaFileExcel, FaFileImage, FaTrash  } from "react-icons/fa6";
import { CATEGORIES } from "../lib/data"
import { uploadFiles } from "../lib/supabaseClient"
import {Toaster, toast} from "sonner"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import { CATEGORIES_ENUM, SUBCATEGORIES_ENUM } from "../../../shared/constants/enums";
import { LuLoaderCircle } from "react-icons/lu"
import axios from "axios"

type CategoryEnum = typeof CATEGORIES_ENUM[number]
type SubcategoryEnum = typeof SUBCATEGORIES_ENUM[number]

const SUBCATEGORIES = CATEGORIES.map((item) => {
    let temp = item.subcategories.map((item) => item)

    return temp
}).flat()

const NewProduct = () => {

    const {currentUser} = useAuthStore()
    const navigate = useNavigate()

    const redirect = useNavigate()
    const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean >(false)
    const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState<boolean >(false)
    const [file, setFile] = useState<File[] >([])
    const [images, setImages] = useState<File[] >([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const removePreviewImage = (index: number) => {
        setImages(prev => prev.filter((item, i) => i !== index))
    }

        const {
            register,
            handleSubmit,
            watch,
            reset,
            setValue,
            formState: { errors }
        } = useForm<TProductValidator>({
            resolver: zodResolver(ProductValidator)
        })

    useEffect(() => {
        if(currentUser === null) redirect('/login?src=new-product')
    }, [])

    const onSubmit: SubmitHandler<TProductValidator> = async ({title, description, price, category, subCategory}) => {
        if(images.length === 0) {
          toast.error('Please provide valid cover images!')
          return
        } else if (images.length > 6) {
          toast.error('You can not upload more than 6 images!')
          return
        }
        if(file.length === 0) {
          toast.error('Please provide valid source files!')
          return
        }
        setIsLoading(true)
        try {
          
          let cover_images = await uploadFiles(images, 'images')
          let files = await uploadFiles(file, 'files')

          if(cover_images === null || cover_images.length === 0 || files === null || files.length === 0) {
            toast.error('There was an error uploading your files! Please check your internet connection and try again!')
            return
          }
          console.log(title, description, price, category, subCategory, files, cover_images)
          
          const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/product/new-product`, {
            title,
            description,
            price,
            category,
            subCategory,
            images: cover_images,
            files
          }, {
            headers: {
                Authorization: `Bearer ${currentUser?.token}`
            }
          }
        )
    
          if(response.status === 200) {
            toast.success('Product added succesfully! You will be redirected shortly.')
              reset({
                title: "",
                price: 0,
                description: "",
                category: undefined,
                subCategory: undefined
              })
              setImages([])
              setFile([])
 
              navigate(`/products/${response.data.productId}`)
              return
          }
    
          if(response.status === 400) {
            toast.error(response.data.message)
          }
    
    
    
        } catch (error) {
          toast.error('There was an error adding this product to the database. Please try again.')
          console.log(error)
        } finally {
          setIsLoading(false)
        }
        
      }

  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
      <Navbar /> 
      <div className="flex-1 flex flex-col items-center justify-center bg-primary">
      <MaxWidthWrapper className="bg-secondary px-2 xl:px-4">
          <div className="flex w-full items-start justify-between py-2 lg:py-4">
            <div className=" flex flex-col ">
              <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Dashboard</h1>
              <p className="text-lg"><Link to={'/'}>Home</Link> /<Link to={'/new-product'}>New Product</Link></p>
            </div>
          </div>
        </MaxWidthWrapper>
          <div className="w-full flex-1 flex flex-col py-4 max-w-7xl px-2 xl:px-4 2xl:px-0 gap-4">
            <div className="w-full flex flex-col">
              <h1 className="text-4xl md:text-5xl font-smooch font-bold">New product</h1>
              <div className="w-4/6 sm:w-3/6 md:w-2/6 h-0.5 rounded-xl bg-accent-teal-300 mb-0.5" />
              <p className="md:text-lg text-accent-gray">Start selling your product to our platform in just a few minutes.</p>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2 md:gap-6 ">
                <form className="flex-1 h-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <label className="text-sm">Title</label>
                        <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="Your products title" {...register("title")}/>
                        {errors.title ? <p className="text-xs text-red-400">{errors.title.message}</p> : null}
                    </div>
                    <div className="w-full flex flex-col">
                        <label className="text-sm">Description</label>
                        <textarea className="w-full h-52 md:h-64 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="More about your product" {...register("description")}/>
                        {errors.description ? <p className="text-xs text-red-400">{errors.description.message}</p> : null}
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Price</label>
                        <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="Price" step="0.01" type="number" {...register("price", {
                        valueAsNumber: true
                    })}/>
                        {errors.price ? <p className="text-xs text-red-400">{errors.price.message}</p> : null}
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Category</label>
                        <div className="relative w-full">
                        <div className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary flex items-center justify-between gap-1  cursor-pointer text-sm sm:text-base" onClick={() => setIsCategoriesOpen(prev => !prev)}>
                            <div className="flex tems-center gap-1">
                              <p className="text-accent-gray">Category:</p>
                              {watch("category") === null ? "Not selected" : watch("category")}
                              
                            </div>
                            <FaChevronDown className="text-accent-gray" />
                        </div>
                    {isCategoriesOpen ? <div className='absolute top-full right-2 translate-y-1 w-full bg-primary shadow-sm border border-border rounded z-50 flex flex-col p-2 gap-2 2xl:left-1/2 2xl:-translate-x-1/2'>
                       {CATEGORIES.map((item) => <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' key={item.id} onClick={() => {
                          setValue("category", item.slug as CategoryEnum)
                          setIsCategoriesOpen(prev => false)
                          }}>
                          {item.name}
                          {watch("category") === item.slug ? <FaCheckDouble /> : null}
                          </p>)}
                    </div> : null}
                    </div>
                    </div>
                    <div className="w-full">
                        <label className="text-sm">Subcategory</label>
                        <div className="relative w-full">
                        <div className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary flex items-center justify-between gap-1 cursor-pointer " onClick={() => setIsSubCategoriesOpen(prev => !prev)}>
                        <div className="flex tems-center gap-1 text-sm sm:text-base">
                              <p className="text-accent-gray">Subcategory:</p>
                              {watch("subCategory") === null ? "Not selected" : watch("subCategory")}
                              
                            </div>
                            <FaChevronDown className="text-accent-gray" />
                        </div>
                    {isSubCategoriesOpen ? <div className='absolute top-full right-2 translate-y-1 w-full bg-primary shadow-sm border border-border rounded z-50 flex flex-col p-2 gap-2 2xl:left-1/2 2xl:-translate-x-1/2 max-h-56 overflow-y-scroll'>
                        {SUBCATEGORIES.map((item) => <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm flex items-center gap-1' key={item.id} onClick={() => {
                          setValue("subCategory", item.slug as SubcategoryEnum)
                            setIsSubCategoriesOpen(prev => false)
                          }}>   {item.name}
                          {watch("subCategory") === item.slug ? <FaCheckDouble /> : null}
                        </p>)}
                    </div> : null}
                </div>
                    </div>
                    <div className='flex flex-col gap-1' >
              <label className='text-sm' htmlFor='title'>File url</label>
              <label htmlFor='file_input'
              className='w-full h-12 bg-secondary rounded-sm shadow flex items-center justify-center cursor-pointer border ' >
                Select File
              </label>
              <input id='file_input'className='hidden'
              type='file' multiple={false} onChange={((e) => {
                if (e.target.files && e.target.files[0]) {
                    //@ts-ignore
                    setFile(prev => [...prev, e.target.files[0]]);
                  }

              })} />
              {errors.files ? <p className='text-xs text-red-500'>{errors.files?.message}</p> : null}
          </div>
                    <div className='flex flex-col gap-1' >
              <label className='text-sm' htmlFor='title'>Cover images</label>
              <label htmlFor='image_input'
              className='w-full h-12 bg-secondary rounded-sm shadow-sm flex items-center justify-center cursor-pointer' >
                Select File
              </label>
              <input id='image_input'className='hidden'
              type='file' onChange={((e) => {
                if (e.target.files && e.target.files[0]) {
                    //@ts-ignore
                    setImages(prev => [...prev, e.target.files[0]]);
                  }

              })} />
              {errors.files ? <p className='text-xs text-red-500'>{errors.files?.message}</p> : null}
          </div>
   
                <button className="w-full h-12 bg-button hover:bg-button/90 shadow text-white flex items-center justify-center rounded-sm my-2">
                    {isLoading ? <LuLoaderCircle className="text-xl sm:text-2xl animate-spin"/> : "Submit"}
                </button>
                </form>
                <div className="w-full md:max-w-80 lg:max-w-96 flex flex-col">
                    <div className="w-full flex flex-col">
                        <h1 className="text-xl">Selected files</h1>
                        <p className="text-sm text-accent-gray">Click on a file to remove it</p>
                        {file.length > 0 ? <div className="px-2">
                            {file.map((item, i) => <div key={`${item.name}${i}`}>
                                <p className="text-accent-gray cursor-pointer" onClick={() => setFile(prev => prev.filter((item, index) => index !== i))}>{item.name}</p>
                            </div>)}
                        </div> : <div className="w-full flex flex-col items-center justify-center py-4 px-4 gap-2">
                                <FaFileExcel className="text-4xl text-accent-lightgray" />
                                <p className="text-accent-lightgray text-center text-lg">Please provide at least one source file for your project before proceeding!</p>
                            </div>}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-xl">Selected image previews</h1>
                        {images.length > 0 ? <div className="px-2 grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                        {images.map((item, i) => {
                        const url = URL.createObjectURL(item);

                        return <div className="aspect-square rounded relative overflow-hidden max-w-96" key={item.name + i}>
                            <FaTrash className=" text-red-400 absolute top-1 right-1 z-20" onClick={() => removePreviewImage(i)}/>
                            <img src={url} className="w-full h-full" />
                        </div>})}
                    </div> : <div className="w-full flex flex-col items-center justify-center py-4 px-4 gap-2">
                                <FaFileImage className="text-4xl text-accent-lightgray" />
                                <p className="text-accent-lightgray text-center text-lg">You can upload up to 6 images for your project, but must provide atleast one to proceed!</p>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer />
      <Toaster richColors={true} position="top-center"/>
    </div>
  )
}

export default NewProduct