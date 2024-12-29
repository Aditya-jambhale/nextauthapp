"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/Users/signup", user)
      console.log("signup successful", response.data);
      toast.success("signup successful");
      router.push('/login');

    } catch (error) {
      if (error instanceof Error) {
        console.log("signup failed");
      }
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className='p-2 mb-4 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        type="text" />
      <label htmlFor="email">email</label>
      <input
        className='p-2 mb-4 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        type="email" />
      <label htmlFor="password">password</label>
      <input
        className='p-2 mb-4 text-black'
        id='username'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        type="password" />
      <button
        onClick={onSignup}
        className='p-3  bg-blue-500 border-[3px] border-gray-300  rounded-md '
      >
        {buttonDisabled ? "Please fill the form" : "Signup"}
      </button>
      <Link href="/login" className='mt-2 text-blue-200 '><span className='underline-none'>Already have account? </span>Please login</Link>
    </div>
  )
}
