import { useEffect, useState } from "react"
import Card from "./Card"
import MaxWidthWrapper from "./MaxWidthWrapper"
import axios from "axios"

const Featured = () => {
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

  const getProducts = async () => {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-products`)
  
      setData(response.data.products)
    }

    useEffect(() => {
      getProducts()
    }, [])

  return (
    <MaxWidthWrapper>
        <div className="flex-1 gap-6 lg:py-6 flex flex-col  font-rubik text-[#0a0908]">
            <div className="w-full flex flex-col">
                <h1 className="text-2xl lg:text-3xl">Featured Products</h1>
                <div className="w-2/6 h-0.5 rounded-xl bg-accent-teal-300 my-2" />
                <p className="text-accent-gray text-lg">Browse Assets Choosen By Our Editors</p>
            </div>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {data.length && data?.map((item) => <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} key={item._id}/>)}
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default Featured