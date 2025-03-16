import { FaDollarSign, FaX } from 'react-icons/fa6'
import Footer from '../components/Footer'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import Navbar from '../components/Navbar'
import { useCart } from '../store/useCart'
import { Link } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import CheckoutForm from '../components/CheckoutForm'
import { Toaster } from 'sonner'



const Checkout = () => {

  const { items, removeItem } = useCart() 

  const cartTotal = items.reduce((prev, curr) => {
    return curr.product.price + prev
  }, 0)

  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
      <Navbar />
      <MaxWidthWrapper className="bg-secondary">
          <div className="flex w-full items-start justify-between py-2 lg:py-4">
            <div className=" flex flex-col ">
              <h1 className="text-5xl md:text-6xl font-semibold font-smooch">Checkout</h1>
              <p className="text-lg"><Link to={'/'}>Home</Link> /<Link to={'/checkout'}>Checkout</Link></p>
            </div>
          </div>
          <div className="flex items-end justify-end py-4">
            <h2 className="font-playwrite text-xs sm:text-xl font-semibold text-white ">Top Quality Digital Assets On Your Fingertips.</h2>
          </div>
        </MaxWidthWrapper> 
    <MaxWidthWrapper className='flex-1 items-start'>
    <div className="flex-1 flex flex-col-reverse md:flex-row py-4 gap-4">
        <div className='flex-1 flex flex-col gap-2 md:gap-4'>
          <h1 className='text-4xl font-smooch w-full pb-1 border-b border-b-accent-lightgray font-medium'>Your Products:</h1>
          {items.length ? items.map(({product}) => (
            <div className='w-full flex gap-2 sm:gap-4 bg-accent-lightgray/10 shadow-sm rounded-sm border border-accent-lightgray/40 relative' key={product._id}>
                <FaX className='text-red-400 absolute top-1 right-1 sm:text-lg cursor-pointer' onClick={() => removeItem(product._id)}/>
                <img className='h-24 sm:h-28 md:h-32 lg:h-44 aspect-square rounded-sm' src={product.image}/>
                <div className='flex flex-col flex-1 justify-evenly'>
                  <p className='text-accent-gray text-xs sm:text-sm'>{product._id}</p>
                  <h1 className='sm:text-lg sm:font-medium truncate'>{product.title.slice(0, 57)}{product.title.length > 57 ? '...' : null}</h1>
                  <div className='flex gap-1 items-center'>
                    <p className='text-lg sm:text-xl md:text-2xl '>{product.price.toFixed(2)}</p> 
                    <FaDollarSign className='sm:text-lg'/>
                  </div>
                  <p><span className='text-accent-gray text-sm sm:text-base'>By</span> {product.author}</p>
                </div>

            </div>
          )) : <div className="w-full h-full flex flex-col items-center justify-center gap-2 min-h-96 px-2">
                  <BsCart4 className="text-accent-gray/50 text-6xl" />
                  <p className="text-3xl sm:text-4xl text-accent-gray/70 font-smooch text-center">Your shopping cart seems to be empty... Try adding some items first!</p>
                </div>}
        </div>
        <CheckoutForm />
      </div>
    </MaxWidthWrapper>
      <Footer />
      <Toaster richColors={true} position="top-center"/>
    </div>
  )
}

export default Checkout