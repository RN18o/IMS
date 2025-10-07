const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    incidentId: {
      type: String,
      unique:true
    },
    // reporterdetails: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    // },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    incidentDetails: {
      type: String,
      required: true,
    },
    reportedDateTime: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

const IncidentModel = mongoose.model("incident", IncidentSchema);

module.exports = IncidentModel;
