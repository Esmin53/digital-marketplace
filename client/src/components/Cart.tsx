import  { useState } from 'react'
import { FaCartShopping, FaX  } from "react-icons/fa6";
import { useCart } from '../store/useCart';

const Cart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {items, removeItem} = useCart()

  console.log("Items: ", items)

  return (
    <div>
        <FaCartShopping className="text-2xl text-accent-teal cursor-pointer" onClick={() => setIsOpen(true)}/>
        { <div className={`fixed top-0 w-80 lg:w-96 h-screen z-[1000] bg-primary border-l border-l-accent-lightgray flex flex-col px-2 py-3 duration-150 ease-in-out 
            ${isOpen ? ' right-0 w-80 lg:w-96' : '-right-[100%] w-0 md:w-0'}`}>
           <div className='w-full flex items-center justify-between border-b pb-1 border-b-accent-lightgray/75'>
              <h1 className='text-4xl font-smooch font-semibold'>My Cart</h1>
              <FaX className='text-2xl cursor-pointer' onClick={() => setIsOpen(false)}/>
           </div>
           <div className='flex-1 py-2 flex flex-col gap-1'>
               {items.map(({product}) => <div key={product._id} className='w-full flex gap-2 min-h-20 relative'>
                  <FaX className='absolute top-1 right-1 z-40 text-red-400 text-sm cursor-pointer' onClick={() => removeItem(product._id)}/>
                  <div className='h-full aspect-square bg-sky-200 rounded-sm shadow-sm relative'>
                    <img src={product.image} className='h-20 aspect-square' />
                  </div>
                  <div className='flex-1 flex flex-col justify-evenly'>
                    <h1 className=''>{product.title}</h1>
                    <p className='font-medium'>$ {product.price}</p>
                    <p className='text-sm text-accent-gray/75'>by {product.author}</p>
                  </div>
               </div>)}
            </div>
           <div className='mt-auto w-full flex flex-col gap-2 border-t pt-1 border-t-accent-lightgray/75'>
              <div className='w-full flex items-center justify-between'>
                <p >Total Items</p>
                <p>3</p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <p >Cart Subtotal</p>
                <p>32.00 $</p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <p className='font-medium'>Cart Total</p>
                <p>32.00 $</p>
              </div>
              <button className='w-full h-10 bg-button text-white rounded-sm shadow'>Checkout</button>
           </div>
        </div> }
    </div>
  )
}

export default Cart