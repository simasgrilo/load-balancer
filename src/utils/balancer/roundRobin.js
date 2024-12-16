const Balancer = require("./balancer.js");

class RoundRobin extends Balancer {

    currServer = 0;
    balancer = null;

    balance() {
        //TODO address the scenario where every server is offline
        console.log(this.serversData);
        let server = this.serversData[this.currServer];
        let iterations = 0;
        while(iterations !== this.serversData.length && Math.round(server.status / 100,1) !== 2) {
            iterations++;
            if (this.currServer % this.serversData.length === 0) {
                //has just scheduled the last server
                this.currServer = 0;
    
            }
            this.currServer++;
            server = this.serversData[this.currServer];

        }
        if (iterations === this.serversData.length) {
            //TODO personalize this error. No servers were found.
            throw Error("No servers were found to serve your request. Please contact Admin");
        }
        return server["ip"];
        //return this.serversData[this.currServer++]["ip"];

    }

    getInstance() {
        if (!this.balancer) {
            return new RoundRobin();
        }
        return this.balancer;
    }
}

module.exports = RoundRobin;