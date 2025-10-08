const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const incidentController = require("../controllers/incident.controller");
const authmiddleware = require("../middleware/auth.middleware");

router.put(
  "/updateincidents/:id",
  [
    authmiddleware.authUser,
    body("incidentDetails")
      .optional()
      .isLength({ min: 3 })
      .withMessage("incidentDetails must be at least 3 characters long"),
  ],
  incidentController.updateIncident
);

router.delete(
  "/deleteincidents/:id",
  authmiddleware.authUser,
  incidentController.deleteIncident
);

router.post(
  "/createincident",
  [
    authmiddleware.authUser,
    body("incidentDetails")
      .notEmpty()
      .withMessage("incidentDetails is required")
      .isLength({ min: 3 })
      .withMessage("incidentDetails must be at least 3 characters long"),
  ],
  incidentController.createIncident
);

router.get("/allincident", authmiddleware.authUser, incidentController.getAllIncidents)
router.get("/oneincident/:id", authmiddleware.authUser, incidentController.getOneIncidents)

module.exports = router;
