import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { LuLoaderCircle } from "react-icons/lu";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean >(false)

    const [ searchParams ] = useSearchParams()
    const redirectUrl = searchParams.get("src")

    const { signIn, currentUser  } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if(isLoading) return
        setIsLoading(true)
        try {
            if(!username.length || !password.length) {
                toast.error("Please provide valid username and password!")
                return
            }

            await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {username, password}).then((res) => {
            setIsLoading(false)    
            if(res.status === 200) {
                    signIn(res.data)
                    toast.success("Login success. You will be redirected to homepage.")
                    if(redirectUrl) {
                        navigate(`/${redirectUrl}`)
                    } else {
                        navigate("/")
                    }
                } 
            })


        } catch (error: AxiosError | any) {
            setIsLoading(false)
            if(error.response.status === 404 || error.response.status === 400) {
                toast.error("Incorrect username or password! Please try again.")
            } else {
                toast.error("Something went wrong. Please try again later.")
            }
        }
    }

    useEffect(() => {
        if(currentUser !== null) {
            navigate("/")
        }
    }, [])

  return (
    <div className="w-screen h-screen flex relative items-center justify-center bg-primary font-rubik">
        <div className="h-[44%] w-full bg-secondary absolute top-0" />
        <form className="max-w-96 w-full min-h-96 bg-transparent sm:bg-primary sm:shadow z-10 sm:border border-accent-lightgray/70 rounded-sm flex flex-col p-4 items-center gap-12" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
            <h1 className="font-smooch text-5xl font-bold text-center">Sign In</h1>
            <div className="flex-1 w-full flex items-center justify-center flex-col gap-2">
            <div className="w-full">
                <label className="text-sm">Username</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2" placeholder="John Doe"
                value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="w-full">
                <label className="text-sm">Password</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2" placeholder="*********" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <button className="w-full h-12 bg-accent-teal shadow-sm rounded-sm text-white flex items-center justify-center" type="submit">{
                    isLoading ? <LuLoaderCircle className="text-xl sm:text-2xl animate-spin"/> : "Login"
                }</button>
                <Link to='/register' className="text-sm ml-auto">Don&apos;t have an account? <span className="text-accent-teal">Sign Up</span></Link>
            </div>
        </form>
    </div>
  )
}

export default Login