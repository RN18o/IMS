// src/pages/EditIncident.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import IncidentForm from "../components/IncidentForm";
import Loader from "../components/Loader";

export default function EditIncident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  //Fetch single incident by ID when page loads
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/incidents/oneincident/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle structure (some APIs return {data: {...}})
        const fetchedIncident = res.data.data || res.data;
        setIncident(fetchedIncident);
      } catch (err) {
        console.error("Error fetching incident:", err);
        alert("Failed to fetch incident details. Please check console.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id, token]);

  // Update incident data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:4000/incidents/updateincidents/${id}`,
        incident,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", res.data);
      alert(res.data.message || "Incident updated successfully!");
      navigate("/incidentlist"); // redirect after successful update
    } catch (err) {
      console.error("Error updating incident:", err);
      alert("Only author can edit their incidents");
    }
  };

  if (loading) return <Loader />;

  if (!incident) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No incident found for this ID.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <IncidentForm
        formData={incident}
        setFormData={setIncident}
        handleSubmit={handleSubmit}
        isEdit={true}
        isDisabled={incident.status === "Closed"}
      />
    </div>
  );
}
