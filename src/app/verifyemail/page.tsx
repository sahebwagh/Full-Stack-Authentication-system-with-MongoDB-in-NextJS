"use client"

import axios from "axios"
import Link from "next/link"
import React, {useState, useEffect} from "react"


export default function verifyEmailPage(){

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);

        } catch (error: any) {
            setError(true)
            console.log(error.message);
            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, []);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-700 p-8 rounded-xl shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6">Verify Email</h1>

          {/* Token display */}
          <div className="mb-6">
            <h2 className="text-base font-medium p-2 bg-orange-500 text-black rounded">
              {token ? token : "No token provided"}
            </h2>
          </div>

          {/* Success Message */}
          {verified && (
            <div className="text-green-600 mt-4">
              <h2 className="text-xl font-semibold mb-2">Email Verified</h2>
              <Link
                href="/login"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Go to Login
              </Link>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-white bg-red-500 p-2 rounded">
                Error verifying email
              </h2>
              <Link
                href="/signup"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Resign in
              </Link>
            </div>
          )}
        </div>
      </div>
    );
}
