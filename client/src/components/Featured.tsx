import Card from "./Card"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Featured = () => {
  return (
    <MaxWidthWrapper>
        <div className="flex-1 gap-6 lg:py-6 flex flex-col  font-rubik text-[#0a0908]">
            <div className="w-full flex flex-col">
                <h1 className="text-2xl lg:text-3xl">Featured Products</h1>
                <div className="w-2/6 h-0.5 rounded-xl bg-accent-teal-300 my-2" />
                <p className="text-accent-gray text-lg">Browse Assets Choosen By Our Editors</p>
            </div>
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default Featured