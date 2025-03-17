import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Footer from "../components/Footer"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuthStore } from "../store/useAuthStore"
import { format } from 'date-fns';
import OrderSummary from "../components/OrderSummary"

const Orders = () => {
  const [isLoading, setIsLoading] = useState<boolean >(false)
  const [orders, setOrders] = useState<{
    _id: string
    createdAt: Date
    totalAmount: number
  }[]>([])

  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || null;

  const [orderId, setOrderId] = useState<string | null>(initialOrderId)

    const { id } = useParams()
    const {currentUser} = useAuthStore()
    //const navigate = useNavigate()

    const getOrders = async () => {
      setIsLoading(true)
      try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/order/get-orders`, {
            headers: {
              Authorization: `Bearer ${currentUser?.token}`
            }
          })

          setOrders(response.data.orders)
          if(response.data.orders.length > 0 && !initialOrderId) setOrderId(response.data.orders[0]._id)
          console.log("Response: ", response.data)
      } catch (error) {
        console.log("Error: ", error)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      getOrders()
    }, [])

  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
    <Navbar /> 
    <MaxWidthWrapper className="bg-secondary">
      <div className="flex w-full items-start justify-between py-2 lg:py-4">
        <div className=" flex flex-col ">
          <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Orders</h1>
          <div className="text-sm sm:text-base md:text-lg flex flex-wrap">
            <Link to={'/'} className="text-accent-gray">Home</Link> /
            <Link to={'/orders'} className="text-accent-gray">Orders</Link>/
            <Link to={`/orders/${id}`} className="">{id}</Link>{orderId}</div>
        </div>
      </div>
    </MaxWidthWrapper>
    <div className="flex-1 flex  justify-center px-2 xl:px-4">
      <div className="w-full flex-1 flex flex-col md:flex-row py-2 gap-10 lg:gap-16 max-w-7xl justify-evenly">
        <div className=" flex flex-col md:min-w-96">
          <h1 className="text-4xl sm:text-5xl font-smooch font-semibold sm:font-medium">Previous purchases</h1>
          <p>Here is a summary of your purchases so far:</p>
          <div className="w-full h-[0.75px] bg-accent-lightgray/60 shadow-sm mb-2" />
            {orders.map((item) => <div key={item._id} className="-space-y-1 cursor-pointer hover:bg-accent-lightgray/10 p-1 rounded-sm hover:shadow-sm" onClick={() => {
              setOrderId(item._id)
              let element = document.getElementById('order-summary');
              element && element.scrollIntoView({
                behavior: 'smooth', 
                block: 'start'     
              });
            }}>
                <p className="text-sm text-accent-gray/60">{format(item.createdAt, 'dd.MM.yyyy')}</p>
                <h1 className="text-lg">{item._id}</h1>
                <p>Order total: {item.totalAmount.toFixed(2)} $</p>
            </div>)}
            {isLoading ? <div className="flex flex-col gap-2 animate-pulse">
                <div className="w-full h-16 bg-accent-lightgray/25"/>
                <div className="w-full h-16 bg-accent-lightgray/25"/>
                <div className="w-full h-16 bg-accent-lightgray/25"/>
            </div> : null}
        </div>
        <OrderSummary orderId={orderId} />
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default Orders