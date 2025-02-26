import Card from "./Card"
import MaxWidthWrapper from "./MaxWidthWrapper"

interface ProductsProps {
  products: {
    price: number
    _id: string
    title: string
    authorId: {
      _id: string
      username: string
    }
    images: string[]
    averageRating: number
  }[]
}

const Products = ({products}: ProductsProps) => {
  return (
    <MaxWidthWrapper className="">
        <div className="w-full max-w-7xl py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center gap-4 gap-y-6">
            {products.map((item) =>  <Card title={item.title} author={item.authorId} _id={item._id} price={item.price} images={item.images} averageRating={item.averageRating} key={item._id}/>)}
        </div>
    </MaxWidthWrapper>
  )
}

export default Products