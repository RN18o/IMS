import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
            SignUp
          </h2>

          <form className="space-y-5">
            {/* First + Last Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm text-gray-200 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm text-gray-200 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

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
            {/* Phone np. */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Phone No.
              </label>
              <input
                type="number"
                placeholder="Enter your phone no."
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
             {/* Pincode */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Pincode
              </label>
              <input
                type="number"
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-300 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
