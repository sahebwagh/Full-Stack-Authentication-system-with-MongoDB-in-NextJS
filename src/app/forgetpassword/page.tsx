"use client";
import axios from "axios";
import React, { useState } from "react";

export default function forgetPassword() {
  const [email, setEmail] = useState("");

  const [sentMail, setSentMail] = useState(false);

  const sendMail = async () => {
    try {
      await axios.post("/api/users/forgetpassword", { email });
      setSentMail(true);
    } catch (error: any) {
      console.log(error.message);
      setSentMail(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Enter Email for Verification
        </h1>

        {/* Email Input */}
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
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={sendMail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
        >
          Send Email
        </button>

        {/* Success Message */}
        {sentMail && (
          <p className="text-green-500 text-center text-sm mt-4">
            Mail sent successfully!
          </p>
        )}
      </div>
    </div>
  );
}
