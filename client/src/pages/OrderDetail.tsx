import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import MaxWidthWrapper from "../components/MaxWidthWrapper"
import Navbar from "../components/Navbar"


const OrderDetail = () => {

    const { id } = useParams()

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
            <Link to={`/orders/${id}`} className="">{id}</Link></div>
        </div>
      </div>
      <div className="flex items-end justify-end py-4">
        
      </div>
    </MaxWidthWrapper>
    <div className="flex-1 flex  justify-center px-2 xl:px-4">
        <div className="w-full flex-1 flex flex-col py-2 gap-8 max-w-7xl">


      </div>
    </div>
    <Footer />
  </div>
  )
}

export default OrderDetail