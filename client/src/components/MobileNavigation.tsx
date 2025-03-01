import { useState } from "react"
import { FaX } from "react-icons/fa6"
import { GiHamburgerMenu } from "react-icons/gi"

const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <GiHamburgerMenu className="flex md:hidden text-2xl ml-auto" onClick={() => setIsOpen(true)}/>
        { <div className={`fixed top-0 w-80 lg:w-96 h-screen z-[1000] bg-primary border-l border-l-accent-lightgray flex flex-col px-2 py-3 duration-150 ease-in-out 
            ${isOpen ? ' right-0 w-80 lg:w-96' : '-right-[100%] w-0 md:w-0'}`}>
            <div className='w-full flex items-center justify-between border-b pb-1 border-b-accent-lightgray/75'>
                <h1 className='text-4xl font-smooch font-semibold'>Navigation</h1>
                <FaX className='text-2xl cursor-pointer' onClick={() => setIsOpen(false)}/>
            </div>
        </div> }
    </div>
  )
}

export default MobileNavigation