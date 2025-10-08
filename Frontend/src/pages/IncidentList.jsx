import React, { useEffect, useState } from "react";
import IncidentCard from "../components/IncidentCard";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut } from "lucide-react";

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/incidents/allincident`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          setIncidents(res.data.incidents);
        } else {
          console.error("Unexpected response status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching incidents:", error);
        setIncidents([]); // avoid crash
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4 md:px-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Incidents</h1>

        <div className="flex items-center gap-3">
          {/* Create Incident Button */}
          <button
            onClick={() => navigate("/createincident")}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <Plus className="w-5 h-5" />
            Create Incident
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Incidents Section */}
      {incidents.length === 0 ? (
        <p className="text-center text-gray-600">
          No incidents found. Create one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {incidents.map((incident) => (
            <IncidentCard
              key={incident._id}
              incident={incident}
              isDisabled={incident.status === "Closed"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
