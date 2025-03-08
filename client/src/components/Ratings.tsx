import { useEffect, useRef, useState } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa6'
import { LuLoaderCircle } from 'react-icons/lu'
import axios from "axios"
import { useAuthStore } from '../store/useAuthStore'

interface RatingsProps {
    initialAverageRating: number
    productId: string
}

const Ratings = ({initialAverageRating, productId}: RatingsProps) => {

    const {currentUser} = useAuthStore()

    const [isRatingsOpen, setIsRatingsOpen] = useState<boolean >(false)
    const [averageRating, setAverageRating] = useState(initialAverageRating)
    const [isLoading, setIsLoading] = useState<boolean >(false)
    const [rating, setRating] = useState<number | null>(null)
    const [stars, setStars] = useState<JSX.Element[]>([])

    const ref = useRef<HTMLDivElement>(null)

    const handleRating = (starNum: number) => {
        if(isLoading) return
        if(starNum === rating) {
            setRating(null)
        } else {
            setRating(starNum)
        }
    }

    const handleSubmit = async () => {
        if(rating === null) return

        setIsLoading(true)
        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/product/rate-products/${productId}`, {
                    rating
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
              })

              setAverageRating(response.data.newRating)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getPrevRating = async () => {
        if(isLoading) return
        setIsLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-user-rating/${productId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
              })

              console.log(response.data)

            setRating(response.data.rating.rating)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fullStars = Math.floor(averageRating )
        const hasHalfStar = averageRating  % 1 !== 0;
      
        const tempStars = [];
      
        for (let i = 0; i < fullStars; i++) {
          tempStars.push(<FaStar className="text-accent-teal text-2xl" key={`star-${i}`} />);
        }
      
        if (hasHalfStar) {
          tempStars.push(<FaStarHalf className="text-accent-teal text-2xl"  key="half-star" />);
        }
  
        setStars(tempStars)
    }, [averageRating])

    useEffect(() => {
        getPrevRating()
    }, [])

  return (
    <div>
        <div className='flex'>
            {stars.length > 0 ? stars.map((item) => item) : <p className="text-accent-gray">No ratings so far</p>}
        </div>
        <p className="text-gray-700 font-medium cursor-pointer" onClick={() => setIsRatingsOpen(true)}>Leave rating</p>
        {isRatingsOpen ? <div className='w-screen h-screen fixed top-0 left-0 z-50 bg-black/20' onClick={(e) => {
            if(ref.current === e.target) setIsRatingsOpen(false)
        }} ref={ref}>
            <div className="fixed w-full max-w-fit h-48 bg-primary top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-accent-lightgray shadow rounded flex flex-col gap-2 items-center justify-between p-4 md:px-8 z-[51]"             
        >
        <p className="text-lg font-medium text-gray-900">Leave your rating</p>
        <div className='flex items-center justify-center w-full'>
            <FaStar  className={`text-5xl cursor-pointer text-accent-gray/75 ${rating && rating >= 1 ? "text-accent-teal" : null}`} onClick={() => handleRating(1)}/>
            <FaStar  className={`text-5xl cursor-pointer text-accent-gray/75 ${rating && rating >= 2 ? "text-accent-teal" : null}`} onClick={() => handleRating(2)} />
            <FaStar  className={`text-5xl cursor-pointer text-accent-gray/75 ${rating && rating >= 3 ? "text-accent-teal" : null}`} onClick={() => handleRating(3)} />
            <FaStar  className={`text-5xl cursor-pointer text-accent-gray/75 ${rating && rating >= 4 ? "text-accent-teal" : null}`} onClick={() => handleRating(4)} />
            <FaStar  className={`text-5xl cursor-pointer text-accent-gray/75 ${rating && rating >= 5 ? "text-accent-teal" : null}`} onClick={() => handleRating(5)} />
        </div>
        <button className='w-full h-10 bg-button rounded flex items-center justify-center text-primary' onClick={handleSubmit}>
            {isLoading ? <LuLoaderCircle className='text-lg animate-spin'/> : "Submit"}
        </button>
                    
        </div>
        </div> : null}
    </div>

  )
}

export default Ratings