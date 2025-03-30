import { Link, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import {userValidator, UserType} from "../../../shared/validators/auth"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import axios from "axios"
import { Toaster, toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";
import { LuLoaderCircle } from "react-icons/lu";


const Register = () => {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { currentUser } = useAuthStore()

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<UserType>({
        resolver: zodResolver(userValidator)
    })

    const onSubmit: SubmitHandler<UserType> = async ({username, password}) => {
        try {
            console.log("Starting")
            if(watch("password") !== confirmPassword) {
                console.log("Password missmatch")
                return
            }
            setIsLoading(true)

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {username, password})
            setIsLoading(false)
            if(response.status === 200) {
                toast.success("You have registered successfully. You will be redirected to login.")
                navigate("/login")
            }
        } catch (error: unknown) {
            setIsLoading(false);
            console.error("Error:", error); // Better to use console.error for errors
            
            if (axios.isAxiosError(error)) {
              // TypeScript now knows this is an AxiosError
              if (error.response?.status === 409) {
                setError("username", {
                  type: "manual",
                  message: "That username is already taken. Please try a different one."
                });
                toast.error("That username is already taken. Please try a different one.");
              } else {
                toast.error("Something went wrong. Please try again later");
              }
            } else if (error instanceof Error) {
              // Handle non-Axios errors
              console.error("Unexpected error:", error.message);
              toast.error("An unexpected error occurred");
            } else {
              // Handle cases where error isn't an Error object
              console.error("Unknown error type:", error);
              toast.error("An unknown error occurred");
            }
          }
    }

    useEffect(() => {
        if(watch("password") !== confirmPassword) {
            setConfirmPasswordError(true)
        } else {
            setConfirmPasswordError(false)
        }
    }, [confirmPassword])

    useEffect(() => {
        if(currentUser !== null) {
            navigate("/")
        }
    }, [])

  return (
    <div className="w-screen h-screen flex relative items-center justify-center bg-primary font-rubik">
        <div className="h-[44%] w-full bg-secondary absolute top-0 " />
        <form className="max-w-96 w-full min-h-96 bg-transparent sm:bg-primary sm:shadow z-10 sm:border border-accent-lightgray/70 rounded-sm flex flex-col p-4 items-center gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full -space-y-2">
                <Link to='/' className="text-sm text-sky-500 w-full flex justify-end z-40">Back to homepage</Link>
                <h1 className="font-smooch text-5xl font-bold text-center">Create new account</h1>
            </div>
            <div className="flex-1 w-full flex items-center justify-center flex-col gap-2">
            <div className="w-full">
                <label className="text-sm">Username</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="John Doe" {...register("username")}/>
                {errors.username ? <p className="text-xs text-red-400">{errors.username.message}</p> : null}
            </div>
            <div className="w-full">
                <label className="text-sm">Password</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="Really secure password" {...register("password")} type="password"/>
                {errors.password ? <p className="text-xs text-red-400">{errors.password.message}</p> : null}
            </div>
            <div className="w-full">
                <label className="text-sm">Confirm Password</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2 outline-secondary" placeholder="Really secure password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password"/>
                {confirmPasswordError ? <p className="text-xs text-red-400">Confirm password filed must match password</p> : null}
            </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <button className="w-full h-12 bg-accent-teal shadow-sm rounded-sm text-white flex items-center justify-center">
                    {isLoading ? <LuLoaderCircle className="text-xl sm:text-2xl animate-spin"/> : "Register"}
                </button>
                <Link to='/login' className="text-sm ml-auto">Already have an account? <span className="text-accent-teal">Sign In</span></Link>
            </div>
        </form>
        <Toaster richColors={true} position="top-center"/>
    </div>
  )
}

export default Register