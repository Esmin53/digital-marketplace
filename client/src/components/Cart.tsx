import  { useState } from 'react'
import { FaCartShopping, FaX  } from "react-icons/fa6";
import { useCart } from '../store/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {items, removeItem} = useCart()

  const cartTotal = items.reduce((prev, curr) => {
    return curr.product.price + prev
  }, 0)

  return (
    <div>
        <FaCartShopping className="text-2xl text-accent-teal cursor-pointer" onClick={() => setIsOpen(true)}/>
        { <div className={`fixed top-0 w-full max-w-80 lg:w-96 h-screen z-[1000] bg-primary border-l border-l-accent-lightgray flex flex-col px-2 py-3 duration-150 ease-in-out 
            ${isOpen ? ' right-0 w-80 lg:w-96' : '-right-[100%] w-0 md:w-0'}`}>
           <div className='w-full flex items-center justify-between border-b pb-1 border-b-accent-lightgray/75'>
              <h1 className='text-3xl md:text-4xl font-smooch font-semibold'>My Cart</h1>
              <FaX className='text-lg md:text-2xl cursor-pointer' onClick={() => setIsOpen(false)}/>
           </div>
           <div className='flex-1 py-2 flex flex-col gap-1 overflow-y-auto'>
               {items.map(({product}) => <div key={product._id} className='w-full flex gap-2 min-h-20 relative'>
                  <FaX className='absolute top-1 right-1 z-40 text-red-400 text-sm cursor-pointer' onClick={() => removeItem(product._id)}/>
                  <div className='h-full aspect-square rounded-sm shadow-sm relative'>
                    <img src={product.image} className='h-20 aspect-square' />
                  </div>
                  <div className='flex-1 flex flex-col justify-evenly'>
                    <h1 className=''>{product.title}</h1>
                    <p className='font-medium'>$ {product.price.toFixed(2)}</p>
                    <p className='text-sm text-accent-gray/75'>by {product.author}</p>
                  </div>
               </div>)}
            </div>
           <div className='mt-auto w-full flex flex-col gap-2 border-t pt-1 border-t-accent-lightgray/75'>
              <div className='w-full flex items-center justify-between'>
                <p >Total Items</p>
                <p>{items.length}</p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <p >Cart Subtotal</p>
                <p>{cartTotal.toFixed(2)} $</p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <p className='font-medium'>Cart Total</p>
                <p>{cartTotal.toFixed(2)} $</p>
              </div>
              <Link to='/checkout' className='w-full h-10 bg-button text-white rounded-sm shadow flex items-center justify-center'>Checkout</Link>
           </div>
        </div> }
    </div>
  )
}

export default Cart