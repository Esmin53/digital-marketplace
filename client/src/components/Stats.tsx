import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Rectangle, PieChart, Pie, AreaChart, Area } from 'recharts';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useState } from 'react';



const Stats = () => {

    const {currentUser} = useAuthStore()
    const [data, setData] = useState<{ total: number, month: number, year: number, monthName: string }[]>([])
    const [allMonths, setAllMonths] = useState<{ total: number, month: number, year: number, monthName: string }[]>([])

    const getStats = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/get-statistics`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })

            setData(response.data.data)
            setAllMonths(response.data.allMonths)
        } catch (error) {
            
        }
    }

      useEffect(() => {
        getStats()
      }, [])

  return (
    <div className='w-full min-h-96 flex gap-4'>
        <div className="flex-1 flex flex-col gap-2">
            <div className="w-full">
              <h1 className="font-smooch text-4xl">Overview</h1>
              <div className="h-[0.5px] w-full bg-accent-lightgray/60 shadow-sm" />
              <p className="text-lg text-accent-gray">Your overall earnings from all your products combined for each month.</p>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="monthName" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#2ec4b6" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='flex gap-2 w-full flex-col md:flex-row items-center justify-center'>

                <div className='w-full md:w-[65%]'>
                    <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                    width={200}
                    height={60}
                    data={allMonths}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                    <YAxis />
                    <Area type="monotone" dataKey="total" stroke="#2ec4b6" fill="#cbf3f0" />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className='w-full md:w-[35%]'>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart
                    width={200}
                    height={60}
                    data={allMonths}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    >

                        <Pie
                            dataKey="total"
                            isAnimationActive={false}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#2ec4b6"
                            label
                        />
                </PieChart>
                </ResponsiveContainer>
                </div>

            </div>

            <div className='w-[100%]'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={allMonths}>
                        
                        <Bar dataKey="total" fill="#216869" />
                        <XAxis dataKey="monthName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default Stats