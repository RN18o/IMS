import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/forgot-password`,
        { email }
      );
      if (res.status === 200) {
        setMessage("Password reset link sent to your email.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form Container */}
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Enter your email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Send Reset Link
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-gray-200 mt-4">{message}</p>
          )}

          <p className="text-center text-gray-300 text-sm mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
