import { FaRegStar } from "react-icons/fa6"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Card from "../components/Card"


const ProductDetail = () => {
  return (
    <div className='min-h-screen flex flex-col text-text font-rubik'>
      <Navbar /> 
      <div className="flex-1 flex items-center justify-center px-2 xl:px-4">
          <div className="w-full flex-1 flex flex-col py-6 md:py-12 gap-8 max-w-7xl">
          <div className="flex-1 h-full flex flex-col sm:flex-row gap-6 xl:gap-10 lg:py-8 xl:py-16">
            <div className="mx-auto w-full max-w-72 sm:max-w-prose  sm:w-64 sm:h-64 md:w-80 md:h-80 lg:h-96 lg:w-96 aspect-square rounded-lg relative overflow-hidden border border-accent-lightgray/60 shadow-sm">
              <img className="w-full h-full" src="https://img.freepik.com/free-vector/illustration-set-mixed-icons-isolated-white-background_53876-9270.jpg?t=st=1737755555~exp=1737759155~hmac=289cb5cbfc57f71eb02813370fa5558aed6ff10d4328b318e0073aabd34cf2ff&w=740" alt="Product Image"/>
            </div>
            <div className="flex-1 flex flex-col md:gap-2">
              <div className="w-full flex items-center justify-between flex-wrap">
                <h2 className="font-medium md:text-lg">E-books & Written Content</h2>
                <p className="text-accent-gray text-sm">Printable PDFs</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-smooch">Item Title</h1>
              <p className="text-sm font-medium">By Author Name</p>
              <p className="text-4xl md:text-5xl font-bold font-smooch">
                $ 12.50
              </p>
                <div className="flex items-center py-2">
                  <FaRegStar className="text-accent-teal text-2xl" />
                  <FaRegStar className="text-accent-teal text-2xl" />
                  <FaRegStar className="text-accent-teal text-2xl" />
                  <FaRegStar className="text-accent-teal text-2xl" />
                </div>
              <p className="text-sm sm:text-base pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ad consectetur suscipit nam atque, tempore inventore officiis, cumque culpa sit est. Assumenda veniam pariatur ad.</p>
              <button className="w-full max-w-96 rounded-lg py-2 md:py-3 mt-auto mb-2  bg-accent-teal font-medium md:text-lg text-white hover:bg-accent-teal/85">Add to cart</button>
            </div>
        </div>
        {/* IMPLEMENT A CAROUSEL AND MOVE TO SEPERATE COMPONENT */}
          <div className="w-full flex flex-col gap-2 sm:gap-4">
            <h2 className="font-medium text-xl md:text-2xl">Similar Products</h2>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {/*<Card /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail