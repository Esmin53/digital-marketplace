import { FaRegCircleUser } from "react-icons/fa6";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useRef, useState } from "react";
import Cart from "./Cart";
import { useOnClickOutside } from "../lib/utils";

const Navbar = () => {

    const { currentUser, signOut } = useAuthStore()
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean >(false)
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => setIsOpen(false));
    
    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

  return (
        <MaxWidthWrapper className="bg-secondary shadow-sm">
        <div className="w-full max-w-7xl h-14 md:h-16 flex gap-6 items-center">
            <Link to={'/'} className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-teal font-smooch">
                PixelVault
            </Link>
            <div className="flex-1 flex gap-6 items-center">
            <div className="flex h-full items-center ml-auto gap-3 z-50">
                {currentUser === null ? <div className="flex items-center gap-8 text-text font-rubik">
                    <Link to={'/register'} className="cursor-pointer">Register</Link>
                    <Link to={'/login'} className="cursor-pointer">Sign In</Link>
                </div> : <div className="relative" ref={modalRef}>
                    <FaRegCircleUser className="text-2xl text-text cursor-pointer" onClick={() => setIsOpen(prev => !prev)}/>
                    {isOpen ? <div className='absolute top-full right-2 translate-y-1 w-52 bg-primary shadow-sm border border-border rounded z-50
                     flex flex-col p-2 gap-2 2xl:left-1/2 2xl:-translate-x-1/2' >
                       <Link to='/new-product' className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' >Upload a product</Link>
                       <Link to={'/my-profile'} className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' >My profile</Link>
                       <p className='text-sm text-gray-600 p-2 cursor-pointer font-medium 
                        hover:bg-primary hover:shadow-sm hover:rounded-sm' onClick={() => handleSignOut()}>Sign Out</p>
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