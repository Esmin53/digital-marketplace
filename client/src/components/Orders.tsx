import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import axios from "axios"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

const Orders = () => {
  const [isLoading, setIsLoading] = useState<boolean >(false)
  const [orders, setOrders] = useState<{
    _id: string
    createdAt: Date
    totalAmount: number
  }[]>([])
  const [page, setPage] = useState(1)
  const isInitialLoad = useRef(true);

    const {currentUser} = useAuthStore()
    const navigate = useNavigate()

    const getOrders = async (p: number) => {
      if(isLoading) return
      setIsLoading(true)
      try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-orders?limit=2&page=${p}`, {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`
            }
          })

          setPage(p)
          setOrders(prev => [...prev, ...response.data.orders])
          console.log("Response: ", response.data)
      } catch (error) {
        console.log("Error: ", error)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      if (isInitialLoad.current) {
        getOrders(1)
        isInitialLoad.current = false;
      }

    }, [])

  return (
    <div className="w-full">
        <div className="w-full flex flex-col">
            <h1 className="font-smooch text-4xl">Orders</h1>
            <div className="h-[0.5px] w-full bg-accent-lightgray/60 shadow-sm" />
            <p className="text-lg text-accent-gray">Here is your order history.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 w-full gap-2">
            {orders.map(({_id, createdAt, totalAmount}) => <div key={_id} className="-space-y-1 cursor-pointer hover:bg-accent-lightgray/10 p-1 rounded-sm hover:shadow-sm" onClick={() => navigate(`/orders?orderId=${_id}`)}>
                <p className="text-sm  text-accent-gray/75">{format(createdAt, 'dd.MM.yyyy')}</p>
                <h1 className="font-medium">{_id}</h1>
                <p className="">Order total: {totalAmount.toFixed(2)} $</p>
            </div>)}
        </div>
         <div className="w-full flex items-center justify-center py-1">
            <button className="text-sky-500 mx-auto text-lg" onClick={() => getOrders(page + 1)}>Load more</button>
        </div> 
    </div>
  )
}

export default Orders