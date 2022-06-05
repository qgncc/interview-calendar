const http = require('http');
const express = require('express');
const apiRouter = require('./routers/api.js');
const cors = require('cors');

const app = express();

const host = 'localhost';
const port = 8081;

app.use(express.static());
app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
