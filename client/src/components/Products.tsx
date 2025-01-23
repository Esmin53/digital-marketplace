import Card from "./Card"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Products = () => {
  return (
    <MaxWidthWrapper className="">
        <div className="w-full max-w-7xl py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 gap-y-6">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </MaxWidthWrapper>
  )
}

export default Products