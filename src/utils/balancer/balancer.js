/* class that implements the basics of the load balancer algorithms that we'll have */
/* idea: implement the Strategy pattern to allow easy changing of the load balancer algorithms*/ 
/* This models the Balancer interface which will be implemented by the concrete classes that implement the algorithms */

var Health = require('../health.js')


class Balancer {   
    
    serversData = Health.getHealthStatus();
    balancer = null;

    balance() {

    }

    getServers() {
        return this.serversData;
    }



}

module.exports = Balancer ;