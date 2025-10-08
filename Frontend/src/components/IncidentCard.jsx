import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Edit3 } from "lucide-react";
import { UserDataContext } from "../context/UserContext";

export default function IncidentCard({ incident }) {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);

  const isClosed = incident.status === "Closed";

  //Check if logged-in user is the reporter of this incident
  const isOwner =
    user && incident.reporterId && incident.reporterId._id === user._id;

  // Handle edit click
  const handleEdit = () => {
    if (!isOwner) {
      alert("You are not allowed to edit another user's incident.");
      return;
    }
    navigate(`/incidents/updateincidents/${incident._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition duration-300 border border-gray-100 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {incident.incidentId}
        </h3>

        <span
          className={`text-sm px-3 py-1 rounded-full ${
            incident.priority === "High"
              ? "bg-red-100 text-red-600"
              : incident.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {incident.priority}
        </span>
      </div>

      <p className="text-gray-700 mb-3 line-clamp-3">
        {incident.incidentDetails}
      </p>

      <p className="text-gray-700 mb-3 font-bold">
        {incident?.reporterId?.fullname
          ? `${incident.reporterId.fullname.firstname || ""} ${
              incident.reporterId.fullname.lastname || ""
            }`.trim()
          : "Unknown Reporter"}
      </p>

      <p className="text-sm text-gray-500 mb-3">
        Reported On:{" "}
        {incident.reportedDateTime
          ? new Date(incident.reportedDateTime).toLocaleString()
          : "N/A"}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            isClosed
              ? "bg-gray-200 text-gray-700"
              : incident.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {incident.status}
        </span>

        {/*Edit Button Logic */}
        {isClosed ? (
          <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-3 py-2 rounded-lg cursor-not-allowed select-none">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Locked</span>
          </div>
        ) : !isOwner ? (
          <div className="flex items-center gap-2 bg-gray-200 text-gray-500 px-3 py-2 rounded-lg cursor-not-allowed select-none">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Not Allowed</span>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <Edit3 className="w-4 h-4" />
            View / Edit
          </button>
        )}
      </div>
    </div>
  );
}
