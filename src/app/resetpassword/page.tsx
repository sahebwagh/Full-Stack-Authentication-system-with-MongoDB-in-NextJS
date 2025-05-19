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
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl ">Change Password</h1>
        <label>New Password</label>
        <input
          className="p-2 mb-3 border rounded w-80"
          type="password"
          placeholder="Enter new password"
          value={user.newPassword}
          onChange={(e) =>
            setUser((pre) => ({ ...pre, newPassword: e.target.value }))
          }
        />
        <input
          className="p-2 mb-3 border rounded w-80"
          type="password"
          placeholder="Conform password"
          value={conformPassword}
          onChange={(e) => setConformPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={changePassword}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>

        {changed && (
          <p className="text-green-500 mt-4">
            Password successfully changed!{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        )}
      </div>
    );



}