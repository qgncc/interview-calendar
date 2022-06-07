const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


client.connect();



function post_req(req,res){
	console.log("add: ",req.body);
}
function del_req(req,res){
	console.log("del: ", req.body);
}
function get_req(req,res){
	console.log("get: ", req.params.date);
}

module.exports={
	post_req,
	del_req,
	get_req
}