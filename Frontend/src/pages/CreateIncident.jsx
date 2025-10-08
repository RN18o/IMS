import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IncidentForm from "../components/IncidentForm";
import { UserDataContext } from "../context/UserContext";

export default function CreateIncident() {
  const [formData, setFormData] = useState({
    incidentDetails: "",
    priority: "Low",
    status: "Open",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent unauthenticated submission
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create an incident.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/incidents/createincident`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        alert("Incident created successfully!");
        setFormData({
          incidentDetails: "",
          priority: "Low",
          status: "Open",
        });

        //Redirect user to their incident list
        navigate("/incidentlist");
      } else {
        console.error("Error creating incident:", res);
      }
    } catch (err) {
      console.error("Error creating incident:", err);
      alert("Something went wrong while creating the incident.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <IncidentForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isEdit={false}
      />

      {loading && <p className="text-center mt-4 text-gray-700">Submitting...</p>}
    </div>
  );
}
