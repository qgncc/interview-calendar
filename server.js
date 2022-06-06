const http = require('http');
const express = require('express');
const apiRouter = require('./routers/api.js');
const cors = require('cors');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8081;
}

app.use(express.static("./build"));
app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
