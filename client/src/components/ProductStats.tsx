import { useParams } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import axios from "axios"
import { useEffect, useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const ProductStats = () => {
    const { id } = useParams()
    const {currentUser} = useAuthStore()

    const [data, setData] = useState<{
        _id: number,
        totalSales: number
        count: number 
        month: string
    }[]>([])
    const [sales, setSales] = useState<number >(0)
    const [orders, setOrders] = useState<number >(0)

    const getData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/get-product-stats/${id}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            setSales(response.data.totalEarnings)
            setOrders(response.data.totalSales)
            setData(response.data.salesByMonth)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div className='w-full flex flex-col gap-4 py-4'>
            <div className='w-full flex flex-col gap-2 h-72 sm:h-80'>
                <p className="text-lg sm:text-xl mb-2">Total earnings: {sales} $</p>
                <ResponsiveContainer width="100%" >
                    <AreaChart data={data}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="totalSales" stroke="#2ec4b6" fill="#cbf3f0" strokeWidth={2} name="Total Earnings" unit="$"/>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex w-full flex-col">
                <p className="text-lg sm:text-xl mb-2">Total sales: {orders}</p>
                <div className='w-full flex flex-col md:flex-row gap-2 items-center'>
                    <div className="w-full md:flex-1 h-72">
                    <ResponsiveContainer width="100%">
                        <BarChart data={data} >               
                            <Bar dataKey="count" fill="#216869" name="Total Sales"/>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip cursor={{ fill: 'rgba(178, 247, 239, 0.3)' }}/>
                            <Legend />
                        
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-80 lg:w-96 flex justify-end h-48">
                    <ResponsiveContainer width="95%">
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="totalSales" stroke="#216869" isAnimationActive={false} dot={false} name="Total Sales"
                            unit="$" strokeWidth={2}/>
                            <ReferenceLine y={1000} stroke="red" label="Target" /> 
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            </div>
    </div>
  )
}

export default ProductStats