const userModel = require("../models/user.model");
const incidentModel = require("../models/incident.model");

function getincidentId(){
function generateIncidentId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 digit
  const year = new Date().getFullYear();
  return `FW${randomNum}${year}`;
}
return generateIncidentId();
}


module.exports.createIncident = async ({
    incidentId,
    // reporterdetails,
    incidentDetails,
    reporterId,
    reportedDateTime,
    priority,
    status,
}) => {
    if (!incidentDetails || !priority || !status) {
        throw new Error("All fields are required");
    }

    const toSave = {
        incidentId: incidentId || getincidentId(),
        // reporterdetails: reporterdetails ? { name: reporterdetails.name } : undefined,
        incidentDetails,
        reporterId,
        reportedDateTime,
        priority,
        status,
    };

    const incident = await incidentModel.create(toSave);
    return incident;
};

// Update an incident only if the requesting user is the reporter
module.exports.updateIncident = async (id, userId, updates) => {
    if (!id) throw new Error("Incident id required");
    if (!userId) throw new Error("User id required");

    const incident = await incidentModel.findById(id).populate("reporterId");
    if (!incident) {
        const err = new Error("Incident not found");
        err.status = 404;
        throw err;
    }
    // reporterId may be stored in different shapes; check common places blog?.authorId?._id.toString()
    const ownerId =
        incident.reporterId?.id?.toString() ||
        (incident.reporterId && incident.reporterId.toString && incident.reporterId.toString());

    if (!ownerId || ownerId !== userId.toString()) {
        const err = new Error("Only User can update his/her incident");
        err.status = 401;
        throw err;
    }

    const updated = await incidentModel.findByIdAndUpdate(incident, { $set: updates }, { new: true });
    return updated;
};

// Delete an incident only if the requesting user is the reporter
module.exports.deleteIncident = async (id, userId) => {
    if (!id) throw new Error("Incident id required");
    if (!userId) throw new Error("User id required");

    const incident = await incidentModel.findById(id).populate("reporterId");
    if (!incident) {
        const err = new Error("Incident not found");
        err.status = 404;
        throw err;
    }

    const ownerId =
        incident.reporterId?.id?.toString() ||
        (incident.reporterId && incident.reporterId.toString && incident.reporterId.toString());

    if (!ownerId || ownerId !== userId.toString()) {
        const err = new Error("Only User can delete his or her incident");
        err.status = 401;
        throw err;
    }

    const res = await incidentModel.findByIdAndDelete(id);
    return res;
};
