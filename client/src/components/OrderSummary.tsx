import axios from "axios"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { LuLoaderCircle } from "react-icons/lu"

interface OrderSummaryProps {
    orderId: string | null
}

const OrderSummary = ({orderId}: OrderSummaryProps) => {
      const [isLoading, setIsLoading] = useState<boolean >(false)
      const [order, setOrder] = useState<{
        _id: string
        products:
          {
            _id: string,
            title: string
            price: number
            category: string,
            subCategory: string
            images: string[]
          }[]
        totalAmount: number
        paymentStatus: string
      } | null>(null)
    
        const {currentUser} = useAuthStore()
    
        const getOrder = async () => {
            if(!orderId) return
            setIsLoading(true)
          try {
              const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-order/${orderId}`, {
                headers: {
                  Authorization: `Bearer ${currentUser?.token}`
                }
              })
    
              setOrder(response.data.order)
              console.log("Response: ", response)
          } catch (error) {
            console.log("Error: ", error)
          } finally {
            setIsLoading(false)
          }
        }
    
        useEffect(() => {
          getOrder()
        }, [orderId])
  
    return (
    <div className="flex-1 max-w-3xl flex flex-col" id="order-summary">
    <h1 className="text-4xl font-smooch">Order sumary</h1>
    <div className='w-full flex flex-col lg:flex-row gap-4 py-4 border-y-[0.5px] border-y-accent-lightgray/35 text-sm'>
        <div className="flex-1 flex gap-4">
        <div className='w-1/2 border-r-[0.75px] border-r-accent-lightgray/55'>
            <p className='text-accent-gray/75'>Date</p>
            <p>16.03.2025</p>
        </div>
        <div className='w-1/2 lg:border-r-[0.75px] lg:border-r-accent-lightgray/55'>
            <p className='text-accent-gray/75'>Items</p>
            <p>1</p>
        </div>
        </div>
        <div className='w-1/3 '>
            <p className='text-accent-gray/75 '>Order number</p>
            <p>{orderId}</p>
        </div>
    </div>
    <div className="flex flex-col gap-2 w-full py-4 flex-1">
    {order?.products.map((item) =><div className="w-full flex gap-2 bg-accent-lightgray/10 p-1 shadow-sm border border-accent-lightgray/15 cursor-pointer">
          <img className="w-20 lg:w-24 aspect-square rounded bg-accent-lightgray/30" src={item.images[0]} />
          
           <div className="flex flex-col gap-1 flex-1" key={item._id}>
            <p className="text-accent-gray text-sm lg:text-base">{item._id}</p>
            <div className='flex justify-between items-center w-full'>
                <p className='text-lg '>{item.title}</p>
                <p className='text-lg '>{item.price.toFixed(2)} $</p>
            </div>
            <div className='flex justify-between items-center w-full'>
                <p className='text-accent-gray/75 text-sm'>{item.category}</p>
                <p className='text-accent-gray/75 text-sm'>{item.subCategory}</p>
            </div>
            
          </div>
        </div>)}
        {isLoading ? <div className="w-full h-40 flex items-center justify-center">
          <LuLoaderCircle className="text-2xl animate-spin" />
        </div> : null}
        {!isLoading ? <div className='w-full flex flex-col gap-2 py-2 border-y-[0.5px] border-y-accent-lightgray/35'>
          <div className="w-full flex justify-between items-center text-accent-gray/75">
            <p>Sub Total</p>
            <p>{order?.totalAmount.toFixed(2)} $</p>
          </div>
          <div className="w-full flex justify-between items-center text-accent-gray/75">
            <p>Shipping</p>
            <p>0.00 $</p>
          </div>
        </div> : null}
        {!isLoading ? <div className="flex items-center justify-between text-lg font-medium">
          <p>Order total</p>
          <p>{order?.totalAmount.toFixed(2)} $</p>
        </div> : null}
    </div>
  </div>
  )
}

export default OrderSummary