import { FaRegCircleUser, FaChevronDown  } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import Cart from "./Cart";
import MobileNavigation from "./MobileNavigation";


const Navbar = () => {

    let { currentUser } = useAuthStore()

    const [isOpen, setIsOpen] = useState<boolean >(false)

  return (
        <MaxWidthWrapper className="bg-secondary shadow-sm">
        <div className="w-full max-w-7xl h-14 md:h-16 flex gap-6 items-center">
            <Link to={'/'} className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-teal font-smooch">
                DigiSeal
            </Link>
            <div className="flex-1 flex gap-6 items-center">
            <div className="w-72 h-10 hidden md:flex">
                <input className="flex-1 border border-r-0 border-accent-teal rounded-bl-lg rounded-tl-lg px-2 outline-none" placeholder="Search" />
                <button className="h-10 w-10 bg-accent-teal rounded-tr-lg rounded-br-lg flex items-center justify-center" aria-label="Search">
                    <FaSearch className="text-xl text-white" />
                </button>
            </div>
            <div className="relative hidden md:flex">
                <p className="flex items-center gap-2 font-rubik cursor-pointer">
                    Categories
                    <FaChevronDown />
                </p>
            </div>
            <div className="flex h-full items-center ml-auto gap-3 z-50">
                {currentUser === null ? <div className="flex items-center gap-8 text-text font-rubik">
                    <Link to={'/register'} className="cursor-pointer">Register</Link>
                    <p className="cursor-pointer">Sign In</p>
                </div> : <div className="relative">
                    <FaRegCircleUser className="text-2xl text-text cursor-pointer" onClick={() => setIsOpen(prev => !prev)}/>
                    {isOpen ? <div className='absolute top-full right-2 translate-y-1 w-52 bg-primary shadow-sm border border-border rounded z-50 flex flex-col p-2 gap-2 2xl:left-1/2 2xl:-translate-x-1/2'>
                       <Link to='/new-product' className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' >Upload a product</Link>
                       <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' >Update your profile</p>
                       <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' >Sign Out</p>
                    </div> : null}
                </div>}
                <div className="h-8 w-[0.75px] bg-accent-teal/70 shadow"/> 
                <Cart />
            </div>
            </div>


        </div>
        </MaxWidthWrapper>
  )
}

export default Navbar