var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
const Forwarder = require("./utils/forwarder.js");
const Reader = require("./utils/reader.js");
dotenv.config({path : path.resolve()+"\\LoadBalancer\\.env"});

var app = express();
var port = process.env.port || 80;

var fwd = new Forwarder();

/* TODO: initialize the server config in another file */



app.get('/', async (req, res) => {
    console.log(req.ip);
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers)
    answer = await fwd.forward(req,'http://127.0.0.1:3000');
    //return the answer of the requisition to the destination server, which for now is only one, or the error that occurred.
    res.status(200).json({
      "message": answer.status
    });
    console.log(process.env)
  })


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
