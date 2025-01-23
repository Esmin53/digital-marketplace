import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

const Card = () => {
  const [isFav, setIsFav] = useState<boolean >(false)

  return (
    <div className='max-w-80 w-full overflow-hidden font-rubik relative flex flex-col cursor-pointer'>
        <div className="absolute top-2 right-2 text-accent-teal text-2xl font-semibold cursor-pointer z-40" onClick={() => setIsFav(prev => !prev)}>
          {isFav ? <FaStar  /> : <FaRegStar  />}
        </div>
        <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow ">
            <img src="https://img.freepik.com/free-vector/white-100-universal-web-icons-set_1057-1119.jpg?t=st=1737605118~exp=1737608718~hmac=49d95bcf0d0f2462e0ad212cf5738b8c3ff1158c6a6ad9e85712f6792bbf8cfd&w=740" className="w-full h-full object-cover"/>
        </div>
        <div className=" w-full px-2 py-1 text-[#1d2529] flex flex-col">
            <h1 className="text-lg">Item Title</h1>
            <p className="text-accent-gray">USD <span>4.75</span></p>
            <div className="flex items-center justify-between w-full flex-wrap">
                <p className="font-medium">Some User</p>
                <div className="flex items-center">
                <div className="flex items-center gap-1">
                  <FaRegStar className="text-accent-teal" />
                  <FaRegStar className="text-accent-teal" />
                  <FaRegStar className="text-accent-teal" />
                  <FaRegStar className="text-accent-teal" />
                </div>
                <p className="text-accent-gray">(15)</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card