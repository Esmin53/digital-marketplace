import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="w-screen h-screen flex relative items-center justify-center bg-primary font-rubik">
        <div className="h-[44%] w-full bg-secondary absolute top-0 " />
        <div className="max-w-96 w-full min-h-96 bg-transparent sm:bg-primary sm:shadow z-10 sm:border border-accent-lightgray/70 rounded-sm flex flex-col p-4 items-center gap-12">
            <h1 className="font-smooch text-5xl font-bold text-center">Create new account</h1>
            <div className="flex-1 w-full flex items-center justify-center flex-col gap-2">
            <div className="w-full">
                <label className="text-sm">Username</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2" placeholder="John Doe"/>
            </div>
            <div className="w-full">
                <label className="text-sm">Password</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2" placeholder="Really secure password"/>
            </div>
            <div className="w-full">
                <label className="text-sm">Confirm Password</label>
                <input className="w-full h-12 rounded shadow-sm border border-accent-lightgray bg-primary px-2" placeholder="Really secure password"/>
            </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <button className="w-full h-12 bg-accent-teal shadow-sm rounded-sm text-white">Register</button>
                <Link to='/login' className="text-sm ml-auto">Already have an account? <span className="text-accent-teal">Sign In</span></Link>
            </div>
        </div>
    </div>
  )
}

export default Register