"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      const message = error.response?.data?.error || "Signup failed";
      setErrorMsg(message);
      setUser((prev) => ({...prev, password: ""}))

      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="mb-6 border-gray-300" />

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {buttonDisabled ? "Cannot Login" : "Login"}
        </button>

        {/* Navigation Links */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-1">
            <Link
              href="/forgetpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          {errorMsg && (
            <p className="text-red-500 text-center mt-2">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
