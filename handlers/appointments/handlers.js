const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
);
// client.connect();

const dateReg=/[0-9]{4}-[0-1][0-9]-[0-3][1-9]/;
const timeReg=/[0-1][0-9]|[2][0-3]/;

function dateToString(date){
  let str = "" +date.getFullYear()+
            "-"+("0"+date.getMonth()).slice(-2)+
            "-"+("0"+date.getDate()).slice(-2);
  return str;
}

function prepareData(data){
  let appointments=[0,0,0,0,0,0,0];
  for (let row of data) {
    //TODO can be optimized
    let date = new Date(row.date);
    let hour = parseInt(row.time.slice(2));

    let mask = 1<<hour;
    appointments[date.getDay()]^=mask;
  }
  return appointments;
}

function post_req(req,res){
	console.log("add: ",req.body);
  let {date, time} = req.body;

  if(
    !dateReg.test(date)
    ||!timeReg.test(time)
    ){
    console.log("Wrong date/time format");
    res.status(400).send('Wrong date/time format').end();
  }else{
    client.query(`INSERT INTO interviews (date, time) VALUES (${date},${time}:00:00)`,(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).end();
      }else{
        res.status(200).end()
      }
    });
  }

}
function del_req(req,res){
	console.log("del: ", req.body);
  let {date, time} = req.body;

  if(
    !dateReg.test(date)
    ||!timeReg.test(time)
    ){
    console.log("Wrong date/time format");
    res.status(400).send('Wrong date/time format').end();
  }else{
    client.query(`DELETE FROM interviews WHERE date=${date} AND time=${time}:00:00`,(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).end();
      }else{
        res.status(200).end()
      }
    });
  }
  
}
function get_req(req,res){
	console.log("get: ", req.params.date);
  let lastDayOfWeek = new Date(req.params.date);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate()+6)
  let lastDayOfWeekStr = dateToString(lastDayOfWeek);
  if(!dateReg.test(req.params.date)){
    console.log("Wrong date format");
    res.status(400).send('Wrong date format').end()
  }else{
    client.query(`SELECT * FROM WHERE date BETWEEN '${req.params.date}' AND '${lastDayOfWeekStr}'`,(err,data)=>{
      if(err){
        console.log(err);
        res.status(500).end();
      }else{
        res.json({appointments}).end();
      }
    });
  }
}

module.exports={
	post_req,
	del_req,
	get_req
}