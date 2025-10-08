import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Automatically fetch user location
  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       setLoadingLocation(true);
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(
  //           async (position) => {
  //             const { latitude, longitude } = position.coords;

  //             // Use free reverse geocoding API (e.g., OpenCage)
  //             const API_KEY = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API key
  //             const res = await fetch(
  //               `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
  //             );
  //             const data = await res.json();

  //             if (data.results && data.results.length > 0) {
  //               const location = data.results[0].components;
  //               const fullAddress = data.results[0].formatted;

  //               setAddress(fullAddress || "");
  //               setPincode(location.postcode || "");
  //             }
  //             setLoadingLocation(false);
  //           },
  //           (error) => {
  //             console.error("Location access denied:", error);
  //             setLoadingLocation(false);
  //           }
  //         );
  //       } else {
  //         console.warn("Geolocation not supported by browser");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching location:", err);
  //       setLoadingLocation(false);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old errors

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      phone,
      address,
      pincode,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const Data = response.data;
        setUser(Data.user);
        localStorage.setItem("token", Data.token);
        navigate("/incidentlist");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            SignUp
          </h2>

          {/* Error message */}
          {errorMessage && (
            <div className="mb-4 bg-red-500/20 text-red-300 border border-red-400 text-sm rounded-lg p-3 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-5">
            {/* First + Last Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm text-gray-200 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Address (auto-filled) */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Address {loadingLocation && "(Detecting...)"}{" "}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Auto-detected address"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Pincode (auto-filled) */}
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Pincode
              </label>
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Auto-detected pincode"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg transition duration-300"
              disabled={loadingLocation}
            >
              {loadingLocation ? "Detecting location..." : "Sign Up"}
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
