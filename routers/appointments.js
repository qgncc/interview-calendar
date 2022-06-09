const express = require("express");
const handlers = require("../handlers/appointments/handlers.js");

const appointments = express.Router();

appointments.post("/", handlers.post_req);
appointments.get("/:date", handlers.get_req);
appointments.delete("/", handlers.del_req);

module.exports = appointments;
