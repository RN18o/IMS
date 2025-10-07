const { validationResult } = require("express-validator");
const incidentService = require("../services/incident.services");
const incidentModel = require("../models/incident.model")


module.exports.updateIncident = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const incidentId = req.params.id;
  const updates = req.body;
  const userId = req.user && req.user._id;

  try {
  const updated = await incidentService.updateIncident(incidentId, userId, updates);
  if (updated && updated.reporterdetails) updated.reporterdetails = (updated.reporterdetails.name || updated.reporterdetails);
  res.status(200).json({ message: "Incident updated", incident: updated });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};

module.exports.deleteIncident = async (req, res, next) => {
  const incidentId = req.params.id;
  const userId = req.user && req.user._id;

  try {
  const deleted = await incidentService.deleteIncident(incidentId, userId);
  if (deleted && deleted.reporterdetails) deleted.reporterdetails = (deleted.reporterdetails.name || deleted.reporterdetails);
  res.status(200).json({ message: "Incident deleted", incident: deleted });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ message: err.message });
    next(err);
  }
};

module.exports.createIncident = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { incidentId, incidentDetails, reportedDateTime, priority, status } = req.body;
  const user = req.user;

  if (!user) return res.status(401).json({ message: "Unauthorized" });

  try {
    // build reporterdetails (only include name for display) and set reporterId for ownership
    const reporterName = user.fullname?.firstname ? `${user.fullname.firstname} ${user.fullname.lastname || ''}`.trim() : undefined;
    const payload = {
      incidentId,
      // reporterdetails: { name: reporterName },
      incidentDetails,
      reporterId:req.user._id,
      reportedDateTime,
      priority,
      status,
    };

    const incident = await incidentService.createIncident(payload);

  // sanitize response: return reporterdetails as a plain string (name)
  if (incident && incident.reporterdetails) incident.reporterdetails = (incident.reporterdetails.name || incident.reporterdetails);

  res.status(201).json({ message: "Incident created", incident });
  } catch (err) {
    next(err);
  }
};

 module.exports.getAllIncidents = async (req,res,next) => {
    const incidents = await incidentModel.find().populate('reporterId').exec();
    res.status(200).json({message:"All Incident fetch Successfully",incidents});
}
