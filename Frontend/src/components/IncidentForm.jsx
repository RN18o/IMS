// src/components/IncidentForm.jsx
import React from "react";

export default function IncidentForm({ formData, setFormData, handleSubmit, isEdit = false }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        {isEdit ? "Edit Incident" : "Create New Incident"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Incident Details</label>
          <textarea
            name="incidentDetails"
            value={formData.incidentDetails}
            onChange={(e) => setFormData({ ...formData, incidentDetails: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe the incident..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {isEdit ? "Update Incident" : "Submit Incident"}
      </button>
    </form>
  );
}
