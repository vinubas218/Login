import React, { useState } from 'react'
import { FaUser, FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CreateAccount = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [successmessage, setSuccessMessage] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")

    if (!username || !email || !password) {
      setError("All fields are required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`${process.env.BACKEND_URL}/createaccount`, {
        name: username,
        email,
        password
      });

      if (res.data.success) {
        setSuccessMessage(true)

        setTimeout(() => {
          navigate('/signin')
        }, 2000)  
      } else {
        setError("Signup was unsuccessful. Try again.");
      }
    } catch (error) {
      // console.error("Signup error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }
  return (
    <div className='flex text-white px-5   items-center bg-[url("/bglogin.jpg")] bg-no-repeat bg-center bg-cover justify-end min-h-screen md:pr-52'>
      <form onSubmit={handleSignup} className=' bg-gray-50 py-8 px-8 rounded-2xl shadow-lg max-w-sm w-full'>
        <p className='text-center text-green-600 font-semibold text-3xl pb-5'>Create Account To Enjoy Your Day 🪐</p>

        <div className='relative flex flex-col py-2'>
          <label htmlFor="" className='pb-1 text-black font-medium'>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=' w-full outline-none py-2 px-2 text-emerald-500 border-b border-emerald-200 focus:border-emerald-400' />
          <FaUser className='absolute text-black right-5 top-13' />
        </div>

        <div className='relative flex flex-col py-2'>
          <label htmlFor="" className='pb-2 text-black font-medium '>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' w-full outline-none py-2 px-2 text-emerald-500  border-b  border-emerald-200 focus:border-emerald-400' />
          <MdOutlineMailOutline className='absolute text-black text-xl right-5 top-13' />
        </div>

        <div className='relative flex flex-col py-2'>
          <label htmlFor="" className='pb-2 text-black font-medium'>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' w-full outline-none py-2 px-2 text-emerald-500 border-b border-emerald-200 focus:border-emerald-400' />
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className='absolute text-black right-5 top-13'
          />
        </div>

        {error &&
          <p className='text-red-600 text-center text-sm my-2'>{error}</p>
        }

        <button type="submit"
          className='w-full bg-emerald-600 rounded-xl my-5 py-3 text-center cursor-pointer hover:bg-emerald-700'
        >
          Create Account
        </button>

        <p className='text-center text-emerald-400 text-xs pt-3'>Already have an account?
          <Link
            to='/signin'
            className='cursor-pointer'>Sign in
          </Link>
        </p>
      </form>

      {
        successmessage && (
          <div className='fixed right-12 top-3 z-50'>
            <div className='bg-green-500 px-3 py-2 rounded-md w-40 text-white shadow-2xl'>
            <p>Signup successful</p>
          </div>
          </div>
        )
      }
    </div>
  )
}

export default CreateAccount
