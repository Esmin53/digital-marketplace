import { FaRegCircleUser, FaCartShopping, FaChevronDown  } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import MaxWidthWrapper from "./MaxWidthWrapper";


const Navbar = () => {

    let user = null

  return (
        <MaxWidthWrapper className="bg-secondary shadow-sm">
        <div className="w-full max-w-7xl h-14 md:h-16 flex gap-6 items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent-teal font-smooch">
                DigiSeal
            </h1>
            <div className="flex-1 hidden md:flex gap-6 items-center">
            <div className="w-72 h-10 flex">
                <input className="flex-1 border border-r-0 border-accent-teal rounded-bl-lg rounded-tl-lg px-2 outline-none" placeholder="Search" />
                <button className="h-10 w-10 bg-accent-teal rounded-tr-lg rounded-br-lg flex items-center justify-center">
                    <FaSearch className="text-xl text-white" />
                </button>
            </div>
            <div className="relative">
                <p className="flex items-center gap-2 font-rubik cursor-pointer">
                    Categories
                    <FaChevronDown />
                </p>
            </div>
            <div className="flex h-full items-center ml-auto gap-3">
                {user === null ? <div className="flex items-center gap-8 text-text font-rubik">
                    <p className="cursor-pointer">Register</p>
                    <p className="cursor-pointer">Sign In</p>
                </div> : <FaRegCircleUser className="text-xl"/>}
                <div className="h-8 w-[0.75px] bg-accent-teal/70 shadow"/> 
                <FaCartShopping className="text-2xl text-accent-teal cursor-pointer"/>
            </div>
            </div>

            {/* MOBILE NAVIGATION */}
            <GiHamburgerMenu className="flex md:hidden text-2xl ml-auto"/>
        </div>
        </MaxWidthWrapper>
  )
}

export default Navbar