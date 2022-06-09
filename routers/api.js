const express = require("express");
const appointments = require("./appointments.js");

const router = express.Router();

router.use("/appointments", appointments);

module.exports = router;
