import { CATEGORIES } from "../lib/data"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
  return (
    <MaxWidthWrapper className='bg-secondary font-rubik'>
        <div className="w-full py-4 md:py-8 lg:py-12 flex flex-col sm:flex-row items-start justify-between min-h-64 gap-6">
            <h1 className="text-5xl font-bold text-accent-teal font-smooch mx-auto sm:mx-0">
                DigiSeal
            </h1>
            <div className="flex gap-6 flex-wrap">
            {CATEGORIES.map((item) => <div key={item.id} className="flex flex-col gap-1">
                <p className="cursor-pointer">{item.name}</p>
                {item.subcategories.map((item) => <p key={item.id} className="text-sm text-accent-gray cursor-pointer">{item.name}</p>)}
            </div>)}
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default Footer