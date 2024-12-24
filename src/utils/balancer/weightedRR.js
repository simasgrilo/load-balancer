var Balancer = require("./balancer.js");

/**
 * Classical implementation of a weighted round robin (WRR). The weight determines how many requests each server will receive before moving to the next one.
 */
class WeighedRoundRobin extends Balancer {

    currServer = 0;
    requestsPerServer = 0;
    balancer = null;

    balance() {
        let server = this.serversData[this.currServer];
        let weight = server.weight;
        if (!weight) {
            //server does not have weight. Default is one
            weight = 1;
        }
        if (this.requestsPerServer === weight){
            //find a new server
            this.requestsPerServer = 0;
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
        }
        this.requestsPerServer++;
        return server["ip"];


    }

    getInstance() {
        if (!this.balancer) {
            return new WeighedRoundRobin();
        }
        return this.balancer;
    }

}

module.exports = WeighedRoundRobin;