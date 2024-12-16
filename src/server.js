var express = require("express");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config({path : path.resolve()+"\\LoadBalancer\\.env"});


//Local imports
const Forwarder = require("./utils/forwarder.js");
const Balancer = require("./utils/balancer/balancerFactory.js");
const Health = require('./utils/health.js');
const Reader = require('./utils/reader.js');

var serversList = JSON.parse(Reader.readServers("C:\\VSCode\\CodingChallenges\\LoadBalancer\\src\\utils\\servers.json"))["servers"];
var fwd;

var setupHealth = async function(){
  Health.scheduleHealthCheck(serversList);
  await Health.checkHealth(serversList);
  fwd = new Forwarder();
  startApp();
}
var port = process.env.port || 80;
var app = express();

setupHealth();



"use strict";

/* TODO: initialize the server config in another file */
/* this will be done in the forwarder class. it will be called here, and forwarder will be responsible for knowing where to route and to who. */

app.get('/', async (req, res) => {
    console.log(req.ip);
    answer = await fwd.forward(req);
    //return the answer of the requisition to the destination server, which for now is only one, or the error that occurred.
    if (Math.round(answer.statusCode / 100, 1) == 5){
      res.status(answer.statusCode).json({
        "errorMessage" : answer.errorMessage
      });
      return;
    }
    res.status(200).send(answer.data);
  })

app.get('/healthcheck', async (req, res) => {
  let serversHealth = await fwd.getHealthCheck(serversList);
  console.log(serversHealth);
  res.status(200).json(serversHealth);
});

startApp = function() {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
};
