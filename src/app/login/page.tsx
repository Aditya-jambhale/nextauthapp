"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function login() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/Users/login", user)
      console.log("login successful", response.data);
      toast.success("login successful");
      router.push('/profile');

    } catch (error: any) {
      console.log("login failed");
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login Form"}</h1>
      <hr />
     
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
        onClick={onLogin}
        className='p-3  bg-blue-500 border-[3px] border-gray-300  rounded-md '
      >
        {buttonDisabled ? "Please fill the form" : "Login"}
      </button>
     
    </div>
  )
}
