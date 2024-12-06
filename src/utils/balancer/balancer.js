/* class that implements the basics of the load balancer algorithms that we'll have */
/* idea: implement the Strategy pattern to allow easy changing of the load balancer algorithms*/ 
/* This models the Balancer interface which will be implemented by the concrete classes that implement the algorithms */

var Reader = require('../reader.js');


class Balancer {   
    
    serversData = JSON.parse(Reader.readServers("C:\\VSCode\\CodingChallenges\\LoadBalancer\\src\\utils\\servers.json"))["servers"];

    balance() {

    }

}

module.exports = Balancer ;