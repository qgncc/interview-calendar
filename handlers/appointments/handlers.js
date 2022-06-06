const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) console.log(err);
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


function post_req(req,res){
	console.log("add")
}
function del_req(req,res){
	console.log("del`")
}
function get_req(req,res){
	console.log("get")
}

module.exports={
	post_req,
	del_req,
	get_req
}