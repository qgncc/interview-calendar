const express = require('express');

const appointments = express.Router();

appointments.post("/",(req, res)=>{
	console.log("post: ",req.body);
});
appointments.get("/:date",(req, res)=>{
	console.log("get: ",req.url);
});
appointments.delete("/",(req, res)=>{
	console.log("delete: ",req.body);
});

module.exports = appointments;