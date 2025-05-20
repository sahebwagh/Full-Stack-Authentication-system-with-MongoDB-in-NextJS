"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error: any) {
            const message = error.response?.data?.error || "Signup failed";
            setErrorMsg(message);
            console.log("Signup Failed", error.message);

            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    }, [user])


    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">
            {loading ? "Processing..." : "Sign Up"}
          </h1>
          <hr className="mb-6 border-gray-300" />

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={onSignup}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Cannot Sign Up" : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
        </div>
      </div>
    );
}