const Balancer = require("./balancer.js");

class RoundRobin extends Balancer {

    currServer = 0;

    balance() {
        console.log(this.serversData);
        if (this.currServer % this.serversData.length === 0) {
            //has just scheduled the last server
            this.currServer = 0;
            return this.serversData[this.currServer]["ip"];
        }
        return this.serversData[this.currServer++]["ip"];

    }
}

module.exports = RoundRobin;