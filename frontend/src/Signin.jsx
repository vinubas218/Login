import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMailOutline } from "react-icons/md";
import axios from 'axios'


const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password");
            return;
        }


        try {
            const res = await axios.post("http://localhost:8000/signin", { email, password });

            if (res.data.success) {
                // console.log("Token received:", res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                setError(res.data.message || "Login failed / Signin to continue.");
            }
        } catch (error) {
            // console.error("Login error:", error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='flex text-white px-5   items-center bg-[url("/bglogin.jpg")] bg-no-repeat bg-center bg-cover justify-end min-h-screen md:pr-52'>
            <form onSubmit={handleLogin} className='bg-gray-50 py-8 px-8 rounded-2xl shadow-lg max-w-sm w-full'>
                <p className='text-center text-green-800 font-semibold text-3xl'>Welcome back 👋</p>

                <div className='py-5 px-3'>
                    <p className='text-sm text-emerald-400 space-y-1'>Today is a new day. It's your day. You shape it.</p>
                    <p className='text-sm text-emerald-400 space-y-1'>Sign in to start your day.</p>
                </div>

                <div className='relative flex flex-col py-2'>
                    <label htmlFor="" className='pb-2 text-black font-medium'>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className=' w-full outline-none py-2 px-2 text-emerald-500 border-b border-emerald-200 focus:border-emerald-400' />
                    <MdOutlineMailOutline className='absolute text-black right-5 top-13' />
                </div>

                <div className='relative flex flex-col py-2'>
                    <label htmlFor="" className='pb-2 text-black font-medium'>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className=' w-full outline-none py-2 px-2 text-emerald-500 border-b border-emerald-200 focus:border-emerald-400' />
                    <FaEye
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute text-black right-5 top-13'
                    />
                </div>

                {error &&
                    <p className='text-red-600 text-center text-sm pt-2'>{error}</p>
                }

                <button
                    type="submit"
                    className="text-center w-full bg-emerald-600 rounded-xl my-5 py-3 cursor-pointer hover:bg-emerald-700"
                >
                    Sign in
                </button>

                <p className='text-center text-emerald-400 text-xs pt-3'>Don't have an account?
                    <Link
                        to='/createaccount'
                        className='cursor-pointer'>Create account
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signin
