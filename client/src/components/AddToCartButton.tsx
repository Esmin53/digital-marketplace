import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { useCart } from "../store/useCart"
import axios from "axios"
import { useEffect, useState } from "react"


interface AddToCartButtonProps {
    _id: string
    title: string
    price: number
    image: string
    authorId: {
        _id: string
        username: string
        purchasedProducts: string[]
      }
    price_id: string
}

const AddToCartButton = ({_id, title, price, image, authorId, price_id}: AddToCartButtonProps) => {

const {items, addItem } = useCart()
const { currentUser } = useAuthStore()
const [data, setData] = useState<string[] >([])

    const getProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-user-products-lite/${authorId._id}`)

            setData(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    console.log("PP", data)

    useEffect(() => {
        getProducts()
    }, [])


    if(authorId?._id === currentUser?.user.id) {
        return <div className="flex flex-col -space-y-1">
            <p>This is your product</p>
            <Link to={'/my-profile'} className='text-3xl font-smooch cursor-pointer text-sky-500 my-auto font-medium'>
                Go To My Profile
            </Link>
        </div>
    }

    if(data?.includes(_id)) {
        return <div className="flex flex-col -space-y-1">
            <p>You own this product</p>
            <Link to={'/my-profile'} className='text-3xl font-smooch cursor-pointer text-sky-500 my-auto font-medium'>
                Go To My Profile
            </Link>
        </div>
    }

  return (
    <div className="mt-auto">
        {
        items.some(item => item.product._id === _id) ? (
         <div
           className="w-full max-w-96 rounded-md py-2 md:py-3 mt-auto mb-2 bg-button md:text-lg text-white hover:bg-button/95 flex items-center justify-center">
           In Cart
         </div>
       ) : (
         <button
           className="w-full max-w-96 rounded-md py-2 md:py-3 mt-auto mb-2 bg-button md:text-lg text-white hover:bg-button/95"
           onClick={() =>
             addItem({
               _id: _id,
               title: title,
               price: price,
               image: image,
               author: authorId.username,
               price_id: price_id
             })
           }
         >
           Add to cart
         </button>
       )}
       </div>
  )
}

export default AddToCartButton