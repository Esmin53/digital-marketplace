import { useState } from "react"
import { useCart } from "../store/useCart"
import axios from "axios"
import { useAuthStore } from "../store/useAuthStore"
import { LuLoaderCircle } from "react-icons/lu"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false)

      const { items } = useCart() 
      const {currentUser} = useAuthStore()
      const navigate = useNavigate()
    
      const cartTotal = items.reduce((prev, curr) => {
        return curr.product.price + prev
      }, 0)

      const payment = async () => {
        if(isLoading) return
        if(items.length === 0) {
          toast.error('Please add some items to your cart before proceeding.')
        }
        setIsLoading(true)
        try {
          const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/order/payment`, {
            items
          }, {
            headers: {
                Authorization: `Bearer ${currentUser?.token}`
            }
          })
    
          if(response.status === 200) {
            window.location.href = response.data.url;
          }
          console.log("Response data: ", response.data)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
        }
    

  return (
    <div className='w-full max-w-80 rounded-sm border border-accent-gray/40 shadow p-2 flex flex-col gap-1.5 h-fit'>
    <h1 className='font-smooch text-3xl font-medium'>Checkout</h1>
        <div className='w-full flex items-center justify-between'>
          <p >Total Items</p>
          <p>{items.length}</p>
        </div>
        <div className='w-full flex items-center justify-between'>
          <p >Cart Subtotal</p>
          <p>{cartTotal.toFixed(2)} $</p>
        </div>
        <div className='w-full h-[0.25px] bg-accent-lightgray/75 shadow-sm'></div>
        <div className='w-full flex items-center justify-between'>
          <p className='font-medium'>Cart Total</p>
          <p>{cartTotal.toFixed(2)} $</p>
        </div>
        {!currentUser ? <button className='w-full h-10 bg-button text-white rounded-sm shadow flex items-center justify-center' onClick={() => navigate('/login?src=checkout')}>
           Checkout
        </button> : <button className='w-full h-10 bg-button text-white rounded-sm shadow flex items-center justify-center' onClick={() => payment()}>
          {isLoading ? <LuLoaderCircle className="animate-spin md:text-lg"/> : "Checkout"}
        </button>}
  </div>
  )
}

export default CheckoutForm