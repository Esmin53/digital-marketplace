import { CATEGORIES } from "../lib/data"
import { HiMiniArrowRight } from "react-icons/hi2";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
        <MaxWidthWrapper className="py-4 xl:py-6">
        <div className="w-full max-w-7xl py-2 lg:py-4 xl:py-6 flex flex-col gap-4 justify-center items-center">
            <div className="w-full py-2 lg:py-4 xl:py-6 gap-2 md:gap-4 flex flex-col items-center justify-center">
                <p className="font-rubik sm:text-lg md:text-xl text-accent-teal ">Explore our categories and find amazing digital products!</p>
                <h1 className="font-smooch text-5xl md:text-6xl font-bold">Browse Categories</h1>
            </div>
            <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-5">
                {CATEGORIES.map((item) => <Link to={`/products?category=${item.slug}`} key={item.id} className="flex-1 aspect-square sm:max-w-32 md:max-w-36 lg:max-w-48 xl:max-w-52 bg-secondary rounded-lg flex flex-col px-1 justify-center items-center font-smooch shadow-sm gap-2 lg:gap-4 cursor-pointer hover:-translate-y-4 duration-300 border border-border">
                    <p className="text-4xl lg:text-6xl">{item.icon}</p>
                    <h1 className="text-xl lg:text-2xl font-semibold text-center leading-5">{item.name}</h1>
                    <div className="flex items-center justify-center gap-1 text-accent-gray font-rubik text-sm lg:text-base">
                        View More
                        <HiMiniArrowRight />
                    </div>
                </Link>)}
            </div>
        </div>
        </MaxWidthWrapper>
  )
}

export default Categories