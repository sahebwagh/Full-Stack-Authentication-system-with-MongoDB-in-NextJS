"use client";
import axios from "axios";
import Link from 'next/link'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState('nothing')

    const logout = async () => {
        try {
            
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
            
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        
        setData(res.data.data._id)
    }

    useEffect (() => {
        getUserDetails()
    }, [data])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-600 p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Profile</h1>
          <hr className="mb-4" />

          <p className="text-gray-900 mb-4">Welcome to your profile page</p>

          <div className="mb-4">
            <h2 className="p-2 rounded text-white bg-green-600 inline-block">
              {data === "nothing" ? (
                "Nothing"
              ) : (
                <Link href={`/profile/${data}`} className="underline">
                  {data}
                </Link>
              )}
            </h2>
          </div>

          <hr className="mb-6" />

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Log Out
          </button>

          {/* Optional: Get User Details Button */}
          {/*
    <button
      onClick={getUserDetails}
      className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
    >
      Get User Details
    </button>
    */}
        </div>
      </div>
    );
}