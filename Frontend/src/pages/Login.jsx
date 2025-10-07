import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-300 text-sm mt-6">
            Create an Account{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
