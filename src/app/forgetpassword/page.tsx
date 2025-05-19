"use client";
import axios from "axios";
import React, {useState} from "react";


export default function forgetPassword() {
    const [email, setEmail] = useState("");

    const [sentMail, setSentMail] = useState(false)

    const sendMail = async () => {
        try {
            await axios.post('/api/users/forgetpassword', {email})
            setSentMail(true)

        } catch (error: any ) {
            console.log(error.message);
            setSentMail((false))
        }
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl ">Enetr for Verify</h1>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={sendMail}
        > Send Email
        </button>

        <p className="text-3xl text-green-500"> {sentMail ? "Mail sent successfully" : "" }</p>
      </div>
    );
}