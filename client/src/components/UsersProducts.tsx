import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Link, useNavigate } from "react-router-dom"


const UsersProducts = () => {

    const [products, setProducts] = useState<{
        authorId: string
        images: string[]
        price: number
        title: string
        _id: string
    }[]>([])
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCounnt] = useState<number | null>(null)
    const isInitialLoad = useRef(true);
    const [isLoading, setIsLoading] = useState<boolean >(false)


    const {currentUser} = useAuthStore()

    const getProducts = async (p: number) => {
        if(isLoading) return
        setIsLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-user-products?limit=6&page=${p}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
              }
            )

            setProducts(prev => [...prev, ...response.data.products])
            setTotalCounnt(response.data.totalCount)
            setPage(p)
        } catch (error) {
            console.log("Error: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isInitialLoad.current) {
            getProducts(1)
            isInitialLoad.current = false;
        }
    }, [])

  return (
    <div className="w-full">
        <div className="w-full flex flex-col">
            <h1 className="font-smooch text-4xl">Owned products</h1>
            <div className="h-[0.5px] w-full bg-accent-lightgray/60 shadow-sm" />
            <p className="text-lg text-accent-gray">Here is a list of products you own.</p>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-2 py-4 gap-2">
            {products.map(({_id, title, price, images}) => <div className="w-full p-1 flex gap-2 bg-accent-lightgray/10 rounded-sm border border-accent-lightgray/15" key={_id}>
                <img className="w-20 h-20 bg-accent-lightgray/20 rounded" src={images[0]} alt="Product image"/>
                <div className="flex flex-col flex-1 justify-between">
                    <p className="text-sm text-accent-gray/75">{_id}</p>
                    <div className="flex w-full items-center justify-between">
                        <h1 className="font-medium sm:text-lg">{title}</h1>
                        <p className="text-sm sm:text-base">{price.toFixed(2)} $</p>
                    </div>
                    <div className="flex w-full items-center justify-evenly">
                        <button className="text-sky-500">Download</button>
                        <Link to={`/products/${_id}`}>Visit page</Link>
                    </div>
                </div>
            </div>)}
        </div>
        {isLoading ? <div className='w-full grid grid-cols-1 lg:grid-cols-2 px-2 gap-2'>
            <div className="w-full gap-2 bg-accent-lightgray/30 rounded-sm border border-accent-lightgray/20 h-24 animate-pulse" />
            <div className="w-full gap-2 bg-accent-lightgray/30 rounded-sm border border-accent-lightgray/20 h-24 animate-pulse" />
        </div> : null}
        {totalCount && totalCount !== products.length ? <div className="w-full flex items-center justify-center">
            <button className="text-sky-500 mx-auto text-lg" onClick={() => getProducts(page + 1)}>Load more</button>
        </div> : null}
    </div>
  )
}

export default UsersProducts