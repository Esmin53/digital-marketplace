import { FaStar, FaStarHalf } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CardProps {
  price: number
  _id: string
  title: string
  author: {
    _id: string
    username: string
  }
  images: string[]
  averageRating: number
}

const Card = ({_id, images, title, author, price, averageRating}: CardProps) => {
  //const navigate = useNavigate();
  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar className="text-accent-teal" key={`star-${i}`} />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalf className="text-accent-teal"  key="half-star" />);
  }

  return (
    <Link to={`/products/${_id}`} className='max-w-80 w-full overflow-hidden font-rubik relative flex flex-col'>
        <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow">
          <div className="min-w-24 px-2 h-7 bg-accent-teal absolute bottom-0 right-0 z-40 rounded-tl-md flex items-center justify-center">
            <p className="text-primary">$ <span>{price.toFixed(2)}</span></p>
          </div>
            <img src={images[0]} className="w-full h-full object-cover z-10"/>
        </div>
        <div className=" w-full px-2 py-0.5 text-[#1d2529] flex flex-col cursor-pointer -space-y-1" >
            <h1 className="text-lg line-clamp-1">{title}</h1>
            <div className="flex items-center justify-between w-full flex-wrap">
                <p className="font-medium">{author.username}</p>
                <div className="flex items-center">
                <div className="flex items-center gap-0.5">
                  {averageRating !== 0 ? stars : <p className="text-accent-gray text-sm">No ratings so far</p>}
                </div>
                </div>
            </div>
        </div>
        </Link>
  )
}

export default Card