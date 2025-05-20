"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState, useEffect} from "react";

export default function resetPassword(){
    
    
    const [user, setUser] = useState({
        newPassword: "",
        token: "",
    })
    const [conformPassword, setConformPassword] = useState("");
    const [changed, setChanged] = useState(false)
    const [error, setError] = useState("")


    const changePassword = async () => {
        if (user.newPassword !== conformPassword) {
          setError("Passwords do not match");
          return;
        }

        try {
            await axios.post('/api/users/resetpassword', user);
            setChanged(true)
            setError("")
        } catch (error: any) {
            console.log("failed to change password",error.message)
            setError("something went wrong, Try again")
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setUser((preUser) => ( {...preUser, token: urlToken || ""}));
    }, [])


    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Change Password
          </h1>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              type="password"
              placeholder="Enter new password"
              value={user.newPassword}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, newPassword: e.target.value }))
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              type="password"
              placeholder="Confirm password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={changePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
          >
            Change Password
          </button>

          {/* Success Message */}
          {changed && (
            <p className="text-green-500 text-sm mt-4 text-center">
              Password successfully changed!{" "}
              <Link
                href="/login"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    );



}